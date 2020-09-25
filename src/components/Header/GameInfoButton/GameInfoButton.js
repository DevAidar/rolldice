import React from 'react';
import { useHistory } from 'react-router-dom';

const GameInfoButton = () => {
	const { location, push } = useHistory();
	console.log(new useHistory());

	return (
		<button 
			className={`throw-dice-button btn btn-info${location.pathname === '/' ? '' : ' active'}`}
			onClick={() => push('/info')}
		>
			<i className='fa fa-info-circle'/>
		</button>
	);
};

export default GameInfoButton;
