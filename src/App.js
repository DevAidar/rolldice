import React, { useState } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import DiceTable from './components/DiceTable/DiceTable';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import './App.scss';  

const App = () => {
	const [state, setState] = useState({ started: false, diceThrown: false });

	return (
		<div className="App">
			<Switch>
				<Route exact path='/'>
					<Header/>
					<DiceTable state={state} throwDice={() => setState({ ...state, diceThrown: true })}/>
				</Route>
				<Route>
					<PageNotFound />
				</Route>
			</Switch>
		</div>
	);
};

export default App;
