import React from 'react';

import './ThrowDiceButton.scss';

const ThrowDiceButton = ({ throwDice }) => {
	return (
		<button 
			className='throw-dice-button'
			onClick={() => throwDice()}
		>
			<i className='fa fa-gamepad'/>
		</button>
	);
};

export default ThrowDiceButton;
