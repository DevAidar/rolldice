import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './pages/Game/Game';
import Info from './pages/Info/Info';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Header from './components/Header/Header';

import './App.scss';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Game />
        </Route>
        <Route path='/info'>
          <Info />
        </Route>
        <PageNotFound />
      </Switch>
    </>
  );
};

export default App;
