import React from 'react';

import logo from '../../images/logo.png';
import profileImg from '../../images/RoundIcons-Free-Set-01.png';

import './Header.scss';

const Header = ({ shown, isLoggedIn }) => {
	return (
		<nav className='navbar'>
			<img src={logo} alt='' className='navbar-logo'/>
			<div className='navbar-content'>
				{ isLoggedIn 
					? <>
						<i class='fa fa-info-circle navbar-info-icon'/>
						<img src={profileImg} alt='' className='navbar-profile-img'/>
					</>
					: <p>Sign Up</p>
				}
			</div>
		</nav>
	);
};

export default Header;
