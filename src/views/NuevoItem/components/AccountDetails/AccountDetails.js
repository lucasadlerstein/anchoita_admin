import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { DropzoneDialog } from 'material-ui-dropzone';
import clienteAxios from '../../../../config/axios';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import {
  Input,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if(id !== null) {
      setEditando(true);
      setIdEditando(id);
      async function cargarDatosEditar() {
        try {
          const consulta = await clienteAxios.get(`/platos/uno/${id}`);
          setValues(consulta.data.plato);
        } catch (error) {
          console.log(error);
        }
      }
      cargarDatosEditar();
    } else {
      setEditando(false);
    }
    // eslint-disable-next-line
  }, [])

  const categorias = [
    { nombre: 'Con la mano', codigo: 'mano' },
    { nombre: 'Quesos', codigo: 'quesos' },
    { nombre: 'Crudas', codigo: 'crudas' },
    { nombre: 'Charcutería de elaboración propia', codigo: 'charcuteria' },
    { nombre: 'Vegetales', codigo: 'vegetales' },
    { nombre: 'De río y mar argentinos', codigo: 'rio-mar' },
    { nombre: 'Huevos', codigo: 'huevos' },
    { nombre: 'Chuletones', codigo: 'chuletones' },
    { nombre: 'Carnes', codigo: 'carnes' },
    { nombre: 'Pastas', codigo: 'pastas' },
    { nombre: 'Postres', codigo: 'postres' },
    { nombre: 'Helados', codigo: 'helados' },
  ]

  const [errores, setErrores] = useState(null);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [values, setValues] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    vegano: false,
    vegetariano: false,
    celiaco: false,
    picante: false,
    destacado: false,
    categoria: editando ? '' : 'mano',
    en_nombre: '',
    en_descripcion: '',
    stock: true,
    visible: true,
  });

  const handleChange = event => {
    if(event.target.name === 'vegano' || event.target.name === 'vegetariano' || event.target.name === 'celiaco' || event.target.name === 'picante' || event.target.name === 'destacado') {
      if(event.target.name === 'vegano') {
        if(!event.target.checked) {
          setValues({ ...values, vegano: false, vegetariano: false })
        } else {
          setValues({ ...values, vegano: true, vegetariano: true })
        }
      } else {
        setValues({ ...values, [event.target.name]: event.target.checked });
      }
    } else {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
  
    const mensajeSwal = withReactContent(Swal);
    if(editando) {
      // editando
      try {
        const post = await clienteAxios.put(`/platos/editar/${idEditando}`, values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El plato fue editado exitosamente`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/platos");
        });
      } catch (error) {
        console.log(error);
        mensajeSwal.fire({
          title: 'Ups...',
          text: `Hubo un error`,
          icon: 'error',
          timer: 3000
        });
      }
    } else {
      // creando nuevo
      try {
        const post = await clienteAxios.post('/platos', values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El plato fue agregado con éxito`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/agregar-plato");
        });
      } catch (error) {
        console.log(error);
        mensajeSwal.fire({
          title: 'Ups...',
          text: `Hubo un error`,
          icon: 'error',
          timer: 3000
        });
      }
    }
  }

  const ConfirmacionSwal = withReactContent(Swal)

  const btnCancelar = () => {
    ConfirmacionSwal.fire({
      title: '¿Seguro querés cancelar?',
      text: `Se perderá toda la información`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0E3453',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro',
      cancelButtonText: 'Quiero seguir'
    }).then( async (result)  => {
      if(result.value){
        window.location.replace("/platos");
      }
    }); 
  }

  const btnVaciar = () => {
    ConfirmacionSwal.fire({
      title: '¿Seguro querés vaciar los campos?',
      text: `Se perderá toda la información`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0E3453',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, vacialo',
      cancelButtonText: 'Seguir editando'
    }).then( async (result)  => {
      if(result.value){
        setValues({
          nombre: '',
          descripcion: '',
          precio: '',
          vegano: false,
          vegetariano: false,
          celiaco: false,
          picante: false,
          destacado: false,
          categoria: editando ? '' : 'mano',
          en_nombre: '',
          en_descripcion: '',
          stock: true,
          visible: true
        })
      }
    }); 
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        method="post"
        noValidate
        onSubmit={(e) => enviarFormulario(e)}
      >
        <CardHeader
          title="AGREGAR NUEVO"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del plato"
                margin="dense"
                name="nombre"
                onChange={handleChange}
                required
                value={values.nombre}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                helperText="¿Como es este plato?"
                label="Descripción"
                margin="dense"
                name="descripcion"
                onChange={handleChange}
                required
                multiline
                value={values.descripcion}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Categoría"
                margin="dense"
                name="categoria"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.categoria}
                variant="outlined"
              >
                <option value={null} disabled selected>- Seleccionar -</option>
                {
                  categorias.map(cat => (
                    <option key={cat.codigo} value={cat.codigo}>{cat.nombre}</option>
                  ))
                }
              </TextField>
            </Grid>
            
            <Grid
              item
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Precio"
                margin="dense"
                name="precio"
                onChange={handleChange}
                required
                type="number"
                value={values.precio}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={2}
              xs={6}
            >
              <FormControlLabel
                control={<Checkbox checked={values.vegano} onChange={handleChange} name="vegano" />}
                label="Vegano"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <FormControlLabel
                control={<Checkbox checked={values.vegetariano} onChange={handleChange} name="vegetariano" />}
                label="Vegetariano"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <FormControlLabel
                control={<Checkbox checked={values.celiaco} onChange={handleChange} name="celiaco" />}
                label="Apto celíaco"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <FormControlLabel
                control={<Checkbox checked={values.picante} onChange={handleChange} name="picante" />}
                label="Picante"
              />
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <FormControlLabel
                control={<Checkbox checked={values.destacado} onChange={handleChange} name="destacado" />}
                label="Destacado"
              />
            </Grid>
          </Grid>
          <Divider />
          <CardHeader
            subheader="Traducción al inglés"
          />
          <Grid
            container
            spacing={3}
          >
            <Grid
                item
                md={3}
                xs={6}
              >
                <TextField
                  fullWidth
                  helperText="En inglés"
                  label="Nombre del plato"
                  margin="dense"
                  name="en_nombre"
                  onChange={handleChange}
                  required
                  value={values.en_nombre}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={6}
              >
                <TextField
                  fullWidth
                  helperText="En inglés"
                  label="Descripción"
                  margin="dense"
                  name="en_descripcion"
                  onChange={handleChange}
                  required
                  multiline
                  value={values.en_descripcion}
                  variant="outlined"
                />
              </Grid>
            </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
          { (editando) ? 'Guardar cambios' : 'Crear' }
          </Button>

          <Button
            onClick={() => btnCancelar()}
            style={{backgroundColor: 'red', color: 'white'}}
            variant="contained"
          >Cancelar</Button>

          {
            editando ? null : (
              <Button
                onClick={() => btnVaciar()}
                color="default"
                variant="contained"
                style={{margin: '0 0 0 auto'}}
              >Vaciar campos</Button>
            ) 
          }

          {/* {errores ? <Alert severity="error">{errores}</Alert> : null} */}
        </CardActions>
      </form>
    </Card>

  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
