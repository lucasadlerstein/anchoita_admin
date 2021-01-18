import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clienteAxios from '../../../../config/axios';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
          const wino = await clienteAxios.get(`/vinos/uno/${id}`);
          setValues(wino.data.vino);
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

  const anadas = [ 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1990, 1989, 1987, 1986, 1983, 1980, 1977, 1968, 1954, 1863 ]

  const bodegas = [ '4040', 'Achaval Ferrer', 'Aleanna', 'Alma 4', 'Alta Vista', 'Altar Uco', 'Altos Las Hormigas', 'Amansado Wines', 'Amar y Vivir', 'Atamisque', 'Barbeito', 'Barons de Rothschild', 'Bemberg Estate Wines', 'Bianchi', 'Bienconvino', 'Blanchard & Lurton', "Blandy's", 'Bodega Etchart', 'Bodega La Libertad', 'Bodegas Alonso', 'Bodegas y Cavas Weinert', 'Bressia', 'Cadus Wines', 'Canopus', 'Cara Sur', 'Carmelo Patti', 'CARO', 'Casa Petrini', 'Casa Yague', 'Catena Zapata', 'Ceretto', 'Chacra', 'Chakana', 'Chamán', 'Chandon' , 'Chateau Margaux', 'Cheval Des Andes', 'Clos de los Siete', 'Cloudy Bay', 'Colomé', 'Comando G', 'Concha y Toro', 'Corazón del Sol', 'Costa y Pampa by Trapiche', 'Croft', 'Cruzar', 'Daniel Pi', 'De Ángeles', 'De Martino', 'Dog Point', 'Domaine Arnoux-Lauchaux', 'Domaine Marchand-Grillot', 'Domaine Nico', 'Dominio de Montaña', 'Doña Paula', "E's Vino Wines", 'El Esteco', 'El Porvenir de Cafayate', 'Envínate', 'Equipo Navazos', 'Ernesto Catena Vineyards', 'Escala Humana Wines', 'Escorihuela Gascon', 'Estancia Los Cardones', 'Estancia Uspallata', 'Fabre Montmayou', 'Familia Durigutti', 'Familia Zuccardi', 'Fernando Dupont', 'Finca Ambrosía', 'Finca Beth', 'Finca Flichman', 'Finca La Anita', 'Finca la Escarcha', 'Finca Las Moras', 'Finca Los Dragones', 'Finca Sophenia', 'Finca Suárez', 'Fonseca, Forjas del Salnes', 'Francisco Lavaque', 'Fuego Blanco Wines', 'Gaja', 'Gen del Alma', 'Henriques Henriques', 'Humberto Canale', 'Julián Díaz y Matías Michelini', 'Kopke Colheita', 'Krontiras', 'La Giostra del Vino', 'La Matilde Comarca Biodinamica', 'La Posta Wines', "Leacock's", 'Lorenzo de Agrelo', 'Luigi Bosca', 'Maison Bollinger', 'Maison Dom Perignon', 'Maison Krug', 'Maison Taittinger', 'Mas Martinet Viticultors', 'Matervini', 'Matías Riccitelli Wines', 'Mendel', 'Michelini i Mufatto', 'Miras', 'Mocali', 'Monteviejo', 'Morelli Vinos de Cava', 'Niven Wines', 'Noemía', 'Norton', 'Onofri Wines', 'Paco Puga', 'Passionate Wine', 'Pedro Parra y Familia', 'Pelissero', 'Per Se',, 'Piedra Negra', 'Pielihueso', 'Pierre Peters', 'Pingus', 'Pulenta Wines', 'Rafael Palacios', 'Raventos', 'Revancha by Roberto de la Mota', 'Revólver by Leo Erazo', 'Roberto Cipresso & Rafael Domingo', 'Rolland Wines', 'Salentein', 'San Pedro de Yacochuya', 'Son Vida Wines', 'Staffelter Hof', 'SuperUco', 'Susana Balbo Wines', 'Tacuil', "Taylor's", 'Teho', 'Terra Camiare', 'Terrazas de los Andes', 'Trapiche', 'Traslapiedra', 'Tupun', 'Vega Sicilia', 'Venus la Universal', 'Ver Sacrum', 'Viña Alicia', 'Viña Cobos', 'Viña Las Perdices', 'Viña Los Chocos', 'Wapisa', 'Zorzal Wines', 'Zuccardi Wines' ]

  const paises = [ 'Argentina', 'Alemania', 'Chile', 'España', 'Francia', 'Italia', 'Nueva Zelanda', 'Portugal' ]

  const regiones = [
    { es: 'Borgoña', en: 'Burgundy' },
    { es: 'Burdeos', en: 'Bordeaux' },
    { es: 'Champagne', en: 'Champagne' },
    { es: 'Toscana', en: 'Tuscany' },
    { es: 'Piemonte', en: '' },
    { es: 'Mosel', en: '' },
    { es: 'Malborough', en: '' },
    { es: 'Montsant', en: '' },
    { es: 'Penedés', en: '' },
    { es: 'Rias Baixas', en: '' },
    { es: 'Valdeorras', en: '' },
    { es: 'Montilla - Moriles', en: '' },
    { es: 'Jerez de la Frontera', en: '' },
    { es: 'Sanlúcar de Barrameda', en: '' },
    { es: 'Tenerife', en: '' },
    { es: 'Priorat', en: '' },
    { es: 'Ribera del Duero', en: '' },
    { es: 'Sierra de Gredos', en: '' },
    { es: 'Elqui', en: '' },
    { es: 'Itata', en: '' },
    { es: 'Maipo', en: '' },
    { es: 'Maule', en: '' },
    { es: 'Madeira', en: '' },
    { es: 'Oporto', en: '' },
    { es: 'Valle de Uco', en: '' },
    { es: 'Luján de Cuyo', en: '' },
    { es: 'Valles Calchaquíes', en: '' },
    { es: 'Trevelin', en: '' },
  ]

  const provincias = [ 'Buenos Aires', 'Catamarca', 'Chubut', 'Córdoba', 'Jujuy', 'La Rioja', 'Mendoza', 'Río Negro', 'Salta', 'San Juan' ]

  const uvas = [ 'Albariño', 'Bequignol', 'Bonarda', 'Cabernet Bouchet', 'Cabernet Franc', 'Cabernet Sauvignon', 'Caiño', 'Carignan', 'Cartoixa', 'Cereza', 'Chardonnay', 'Chenin Blanc', 'Cinsault', 'Cordisco', 'Criolla', 'Ensamblaje', 'Garnacha', 'Gewurztraminer', 'Godello', 'Gruner Veltliner', 'Listán Negro', 'Malbec', 'Malvasía', 'Marsanne', 'Merlot', 'Moscatel Blanco', 'Moscatel Rosado', 'Moscatel Tinto', 'Mourvedre', 'Nebbiolo', 'Palomino Fino', 'Pedro Ximénez', 'Petit Manseng', 'Petit Verdot', 'Pinot Gris', 'Pinot Noir', 'Riesling', 'Sangiovese', 'Sauvignon Blanc', 'Semillón', 'Syrah', 'Tannat', 'Tempranillo', 'Tinta País', 'Torrontés', 'Trousseau', 'Verdejo', 'Viognier' ]

  const tipos = [ 
    { nombre: 'Espumoso', codigo: 'espumoso' },
    { nombre: 'Blanco', codigo: 'blanco' },
    { nombre: 'Naranjo', codigo: 'naranjo' },
    { nombre: 'Rosado', codigo: 'rosado' },
    { nombre: 'Tinto', codigo: 'tinto' },
    { nombre: 'Dulce', codigo: 'dulce' },
    { nombre: 'Fortificado seco', codigo: 'fort-seco' },
    { nombre: 'Fortificado dulce', codigo: 'fort-dulce' }
  ]

  const [errores, setErrores] = useState(null);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);
  const [values, setValues] = useState({
    nombre: '',
    anada: editando ? '' : 2020,
    bodega: editando ? '' : '4040',
    precio: '',
    vinedo: '',
    pais: editando ? '' : 'Argentina',
    region: '',
    tipo: editando ? '' : 'Espumoso',
    uva: editando ? '' : 'Albariño',
    copa: false,
    t375: false,
    t500: false,
    t750: true,
    t1125: false,
    t1500: false,
    t3000: false,
    c140: false,
    c120: false,
    c70: false,
    c35: false,
    stock: true,
    visible: true,
    en_nombre: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const handleChangeCheckbox = event => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
  
    const mensajeSwal = withReactContent(Swal);
    if(editando) {
      // editando
      try {
        const post = await clienteAxios.put(`/vinos/editar/${idEditando}`, values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El vino fue editado exitosamente`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/vinos");
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
        const post = await clienteAxios.post('/vinos', values);
        mensajeSwal.fire({
          title: '¡Excelente!',
          text: `El vino fue agregado con éxito`,
          icon: 'success',
          timer: 3000
        }).then(()=> {
          window.location.replace("/agregar-vino");
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
        window.location.replace("/vinos");
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
          anada: editando ? '' : 2020,
          bodega: editando ? '' : '4040',
          precio: '',
          vinedo: '',
          pais: editando ? '' : 'Argentina',
          region: '',
          tipo: editando ? '' : 'Espumoso',
          uva: editando ? '' : 'Albariño',
          copa: false,
          t375: false,
          t500: false,
          t750: true,
          t1125: false,
          t1500: false,
          t3000: false,
          c140: false,
          c120: false,
          c70: false,
          c35: false,
          stock: true,
          visible: true,
          en_nombre: ''
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
          title="VINO NUEVO"
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
              xs={12}
            >
              <TextField
                fullWidth
                helperText="En español"
                label="Nombre del vino"
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
              md={2}
              lg={1}
              xs={6}
            >
              <TextField
                fullWidth
                label="Añada"
                margin="dense"
                name="anada"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.anada}
                variant="outlined"
              >
                <option value={null} disabled selected>- Seleccionar una -</option>
                {
                  anadas.map(opc => (
                    <option key={opc} value={opc}>{opc}</option>
                  ))
                }
              </TextField>
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Bodega"
                margin="dense"
                name="bodega"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.bodega}
                variant="outlined"
              >
                <option value={null} disabled selected>- Seleccionar una -</option>
                {
                  bodegas.map(opc => (
                    <option key={opc} value={opc}>{opc}</option>
                  ))
                }
              </TextField>
            </Grid>    
            <Grid
              item
              md={3}
              lg={2}
              xs={12}
            >
              <TextField
                fullWidth
                label="Viñedo"
                margin="dense"
                name="vinedo"
                onChange={handleChange}
                required
                multiline={true}
                type="number"
                value={values.vinedo}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              lg={2}
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label="Uva"
                margin="dense"
                name="uva"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.uva}
                variant="outlined"
              >
                {
                  uvas.map(opc => (
                    <option key={opc} value={opc}>{opc}</option>
                  ))
                }
              </TextField>
            </Grid>
            <Grid
              item
              lg={2}
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
              md={3}
              lg={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="País"
                margin="dense"
                name="pais"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.pais}
                variant="outlined"
              >
                {
                  paises.map(opc => (
                    <option key={opc} value={opc}>{opc}</option>
                  ))
                }
              </TextField>
            </Grid>
            <Grid
              item
              lg={2}
              md={3}
              xs={6}
            >
              <TextField
                fullWidth
                label={(values.pais === 'Argentina') ? 'Provincia' : 'Región'}
                margin="dense"
                name="region"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.region}
                variant="outlined"
              >
                {
                  (values.pais === 'Argentina') ? (
                    provincias.map(opc => (
                      <option key={opc} value={opc}>{opc}</option>
                    ))
                  ) : (
                    regiones.map(opc => (
                      <option key={opc.es} value={opc.es}>{opc.es}</option>
                    ))
                  )
                }
              </TextField>
            </Grid>
            <Grid
              item
              md={2}
              xs={6}
            >
              <TextField
                fullWidth
                label="Tipo"
                margin="dense"
                name="tipo"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.tipo}
                variant="outlined"
              >
                {
                  tipos.map(opc => (
                    <option key={opc.codigo} value={opc.codigo}>{opc.nombre}</option>
                  ))
                }
              </TextField>
            </Grid>
          </Grid>
          <CardHeader
            subheader="Tamaños"
          />
          <Grid
            container
            spacing={3}
          >
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.t375} onChange={handleChangeCheckbox} name="t375" />} label="375ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.t500} onChange={handleChangeCheckbox} name="t500" />} label="500ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.t750} onChange={handleChangeCheckbox} name="t750" />} label="750ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.t1125} onChange={handleChangeCheckbox} name="t1125" />} label="1125ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.t1500} onChange={handleChangeCheckbox} name="t1500" />} label="1500ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.t3000} onChange={handleChangeCheckbox} name="t3000" />} label="3000ml" />
            </Grid>
          </Grid>
          <CardHeader
            subheader="Por copa"
          />
          <Grid
            container
            spacing={3}
          >
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.c140} onChange={handleChangeCheckbox} name="c140" />} label="140ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.c120} onChange={handleChangeCheckbox} name="c120" />} label="120ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.c70} onChange={handleChangeCheckbox} name="c70" />} label="70ml" />
            </Grid>
            <Grid item lg={1} md={2} xs={4}>
              <FormControlLabel control={<Checkbox checked={values.c35} onChange={handleChangeCheckbox} name="c35" />} label="35ml" />
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
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  helperText="En inglés"
                  label="Nombre del vino"
                  margin="dense"
                  name="en_nombre"
                  onChange={handleChange}
                  required
                  value={values.en_nombre}
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

          
          {errores ? <Alert severity="error">{errores}</Alert> : null}
        </CardActions>
      </form>
    </Card>

  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
