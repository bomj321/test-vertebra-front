import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../containers/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
