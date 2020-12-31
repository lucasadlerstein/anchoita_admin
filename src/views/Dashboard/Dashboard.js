import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import clienteAxios from '../../config/axios';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  ComprasDash
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  aboutTalleres: {
    fontFamily: 'Roboto' 
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [estadisticas, setEstadisticas] = useState({});

  useEffect(() => {
    const traerDatos = async () => {
      const estadisticasDB = await clienteAxios.get('/general/estadisticas');
      setEstadisticas(estadisticasDB.data);
      console.log(estadisticasDB.data);
    }
    traerDatos();
  //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget inscriptosNewsletter={estadisticas.totalPlatos}
            onClick={() => window.location.href = '/platos'}
            style={{cursor: 'pointer'}}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers inscriptosCharlas={estadisticas.totalVinos}
            onClick={() => window.location.href = '/vinos'}
            style={{cursor: 'pointer'}}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress eventosTotales={estadisticas.totalCocteleria}
            onClick={() => window.location.href = '/cocteles'}
            style={{cursor: 'pointer'}}
          />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit totalCharlasVisibles={estadisticas.totalOcultos} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
