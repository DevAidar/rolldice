import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const GameInfoButton = () => {
	const { location, push } = useHistory();
	console.log(new useHistory());

	return (
		<Link 
			className={`throw-dice-button btn btn-info${location.pathname === '/' ? '' : ' active'}`}
			to='/info'
		>
			<i className='fa fa-info-circle'/>
		</Link>
	);
};

export default GameInfoButton;
