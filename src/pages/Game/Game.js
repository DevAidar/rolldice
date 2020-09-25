import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import DiceTable from '../../components/DiceTable/DiceTable';

const Game = () => {
	const [state, setState] = useState({ started: false, diceThrown: false });
  
	return (
		<>
			<Header/>
			<DiceTable state={state} throwDice={() => setState({ ...state, diceThrown: true })}/>
		</>
	);
};

export default Game;
