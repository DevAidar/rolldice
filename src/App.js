import React, { useState } from 'react';
import { Route, Router } from 'react-router-dom';

import Header from './components/Header/Header';
import DiceTable from './components/DiceTable/DiceTable';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import './App.scss';  

const App = () => {
	const [state, setState] = useState({ started: false, diceThrown: false });

	return (
		<div className="App">
			<Router>
				<Route exact path="/">
					<Header/>
					<DiceTable state={state} throwDice={() => setState({ ...state, diceThrown: true })}/>
				</Route>
				<PageNotFound />
			</Router>
		</div>
	);
};

export default App;
