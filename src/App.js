import React, { useState } from 'react';

import Header from './components/Header/Header';
import DiceTable from './components/DiceTable/DiceTable';
import ThrowDiceButton from './components/ThrowDiceButton/ThrowDiceButton';

import './App.scss';  

const App = () => {
	const [state, setState] = useState({ started: false, diceThrown: false });

	return (
		<div className="App">
			<Header/>
			<DiceTable state={state} throwDice={() => setState({ ...state, diceThrown: true })}/>
			<ThrowDiceButton throwDice={() => setState({ ...state, started: true })}/>
		</div>
	);
};

export default App;
