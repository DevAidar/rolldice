import React from 'react';

import logo from '../../images/logo.png';
import profileImg from '../../images/RoundIcons-Free-Set-01.png';

import ThrowDiceButton from './ThrowDiceButton/ThrowDiceButton';
import GameInfoButton from './GameInfoButton/GameInfoButton';

import './Header.scss';

const Header = ({ shown, isLoggedIn }) => {
	return (
		<nav className='navbar'>
			<img src={logo} alt='' className='navbar-logo'/>
			<div className='navbar-game-switch btn-group btn-group-toggle'>
				<GameInfoButton/>
				<ThrowDiceButton/>
			</div>
			<div className='navbar-content'>
				{ isLoggedIn 
					? <>
						<i class='fa fa-info-circle navbar-info-icon'/>
						<img src={profileImg} alt='' className='navbar-profile-img'/>
					</>
					: <p className='navbar-text'>Sign Up</p>
				}
			</div>
		</nav>
	);
};

export default Header;
