import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Platos as PlatosView,
  Cocteles as CoctelesView,
  Vinos as VinosView,
  NuevoItem as NuevoItemView,
  NuevoCocktail as NuevoCocktailView,
  NuevoVino as NuevoVinoView,
  EditarAgenda as EditarAgendaView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/usuarios"
      />
      <RouteWithLayout
        component={PlatosView}
        exact
        layout={MainLayout}
        path="/platos"
      />
      <RouteWithLayout
        component={VinosView}
        exact
        layout={MainLayout}
        path="/vinos"
      />
      <RouteWithLayout
        component={CoctelesView}
        exact
        layout={MainLayout}
        path="/cocteles"
      />
      <RouteWithLayout
        component={NuevoItemView}
        exact
        layout={MainLayout}
        path="/agregar-plato"
      />
      <RouteWithLayout
        component={NuevoVinoView}
        exact
        layout={MainLayout}
        path="/agregar-vino"
      />
      <RouteWithLayout
        component={NuevoCocktailView}
        exact
        layout={MainLayout}
        path="/agregar-coctel"
      />
      <RouteWithLayout
        component={EditarAgendaView}
        exact
        layout={MainLayout}
        path="/editar-agenda"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
