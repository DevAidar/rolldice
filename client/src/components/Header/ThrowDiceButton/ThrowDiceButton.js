import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const ThrowDiceButton = () => {
	const { location } = useHistory();

	return (
		<Link 
			className={`throw-dice-button btn btn-info${location.pathname === '/' ? ' active' : ''}`}
			to='/'
		>
			<i className='fa fa-gamepad'/>
		</Link>
	);
};

export default ThrowDiceButton;
