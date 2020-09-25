import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import Game from './pages/Game/Game';
import Info from './pages/Info/Info';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import './App.scss';  

const App = () => {

	return (
		<div className="App">
			<Switch>
				<Route exact path='/'>
					<Game />
				</Route>
				<Route exact path='/info'>
					<Info />
				</Route>
				<Route>
					<PageNotFound />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
