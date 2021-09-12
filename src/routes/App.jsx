import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axiosconf from '../axios';

import Template from '../components/Template';

import Login from '../containers/Login';
import Character from '../containers/Character';
import Location from '../containers/Location';
import Episode from '../containers/Episode';

import useToken from '../hooks/useToken';

const App = () => {
  axiosconf();
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Login setToken={setToken} />} />
        </Switch>
      </BrowserRouter>
    );
  }

  if (token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Login setToken={setToken} />} />
          <Template>
            <Route exact path="/characters" component={Character} />
            <Route exact path="/locations" component={Location} />
            <Route exact path="/episodes" component={Episode} />
          </Template>
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
