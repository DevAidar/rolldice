import React from 'react';
import { useHistory } from 'react-router-dom';

const ThrowDiceButton = () => {
	const { location, push } = useHistory();

	return (
		<button 
			className={`throw-dice-button btn btn-info${location.pathname === '/' ? ' active' : ''}`}
			onClick={() => push('/')}
		>
			<i className='fa fa-gamepad'/>
		</button>
	);
};

export default ThrowDiceButton;
