import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';
import profileImg from '../../images/RoundIcons-Free-Set-01.png';

import ThrowDiceButton from './ThrowDiceButton/ThrowDiceButton';
import GameInfoButton from './GameInfoButton/GameInfoButton';

import './Header.scss';

const Header = ({ shown, isLoggedIn }) => {
	return (
		<nav className='container navbar'>
			<Link to="/">
				<img src={logo} alt='' className='navbar-logo' loading="lazy"/>
			</Link>
			<div className='navbar-game-switch btn-group btn-group-toggle'>
				<GameInfoButton/>
				<ThrowDiceButton/>
			</div>
			<div className='navbar-content'>
				{ isLoggedIn 
					? <Link to='/profile'>
						<i className='fa fa-info-circle navbar-info-icon'/>
						<img src={profileImg} alt='' className='navbar-profile-img'/>
					</Link>
					: <p className='navbar-text'>Sign Up</p>
				}
			</div>
		</nav>
	);
};

export default Header;
