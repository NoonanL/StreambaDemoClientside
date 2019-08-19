import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';
import SignIn from './components/SignIn';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/home" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Router;