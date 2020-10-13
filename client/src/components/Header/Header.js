import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../images/logo.png';
import profileImg from '../../images/questionMark.png';

import ThrowDiceButton from './ThrowDiceButton/ThrowDiceButton';
import GameInfoButton from './GameInfoButton/GameInfoButton';

import './Header.scss';

const Header = ({ shown, loggedIn, username, profileImage }) => {
  const { location } = useHistory();

  return (
    <nav className='container navbar'>
      <Link to="/">
        <img src={logo} alt='' className='navbar-logo' loading="lazy" />
      </Link>
      <div className='navbar-game-switch btn-group btn-group-toggle'>
        <GameInfoButton />
        <ThrowDiceButton />
      </div>
      <div className='navbar-content'>
        {loggedIn
          ? <>
            <i className='fa fa-info-circle navbar-info-icon' />
            {profileImage && <Link to='/profile'>
              <img src={'https://roll-dice-app.herokuapp.com/' + profileImage} alt='' className='navbar-profile-img' />
            </Link>}
          </>
          : location.pathname === '/accounts/login'
            ? <Link
              className='navbar-text'
              to={{
                pathname: '/accounts/signup',
                state: location.pathname,
              }}
            >Signup</Link>
            : <Link
              className='navbar-text'
              to={{
                pathname: '/accounts/login',
                state: location.pathname,
              }}
            >Login</Link>
        }
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  username: state.username,
  profileImage: state.profileImage,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
