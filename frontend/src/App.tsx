import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './screens/Login';
import Register from './screens/Register';
import Game from './screens/Game';
import Navbar from './components/Navbar';

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/game" component={Game} />
      <Route render={() => <Redirect to="/login" />} />
    </Switch>
  </BrowserRouter>
);

export default App;
