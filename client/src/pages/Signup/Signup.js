import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { signup, getAccessToken, getUserData } from '../../actions';
import Cookies from 'js-cookie';

import logo from '../../images/logo.png';

import './Signup.scss';

const Signup = ({ signup, accessToken, loginError, getAccessToken, getUserData }) => {
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // variables
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [username, setUsername] = useState('');
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    setPassword('');
    setDisabled(true);
    
    if (
      firstName ||
      lastName ||
      username ||
      email ||
      EMAIL_REGEX.test(email) ||
      password.length >= 8
    ) {
      signup(firstName, lastName, username, email.toLowerCase(), password);
    }

  };

  useEffect(() => {
    if (!accessToken && Cookies.get('refresh-token')) {
      getAccessToken(Cookies.get('refresh-token'));
    }

    if (accessToken || loginError)
      setDisabled(false);

    if (accessToken) {
      getUserData(accessToken);
      history.push('/profile/image-upload');
    }
  }, [isDisabled, accessToken, loginError, getAccessToken])

  return (
    <div className='signup-card'>
      <img src={logo} alt='' className='signup-logo' />
      <p className='signup-text'>Sign Up</p>
      <form className='login-form'
        onSubmit={e => onSubmit(e)}
      >
        <div className='name-inputs'>
          <input
            className={`signup-username-input signup-input name-input${showFirstNameError ? firstName ? '' : ' bad-input' : ''}`}
            type='text'
            name='firstName'
            placeholder='First name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => setShowFirstNameError(true)}
          />

          <input
            className={`signup-username-input signup-input name-input${showLastNameError ? lastName ? '' : ' bad-input' : ''}`}
            type='text'
            name='lastName'
            placeholder='Last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => setShowLastNameError(true)}
          />
        </div>
        { (showFirstNameError && !firstName || showLastNameError && !lastName) && 
          <p className='name-error-message'>{!firstName || !lastName ? !firstName ? 'First name cannot be blank' : 'Last name cannot be blank' : null}</p>
        }

        {/* <p className='error-message'>{badEmail ? 'Incorrect Email type' : null}</p> */}
        <input
          className={`signup-username-input signup-input${showUsernameError ? username ? '' : ' bad-input' : ''}`}
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setShowUsernameError(true)}
        />
        { showUsernameError &&
          <p className='error-message'>{username ? null : 'Username cannot be blank'}</p>
        }

        {/* <p className='error-message'>{badEmail ? 'Incorrect Email type' : null}</p> */}
        <input
          className={`signup-username-input signup-input${showEmailError ? email ? EMAIL_REGEX.test(email) ? '' : ' bad-input' : ' bad-input' : ''}`}
          type='text'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setShowEmailError(true)}
        />
        { showEmailError &&
          <p className='error-message'>{email ? EMAIL_REGEX.test(email) ? null : 'Not a valid email' : 'Email cannot be blank'}</p>
        }

        {/* <p className='error-message'>{badPassword ? 'Password is too short' : null}</p> */}
        <div>
          <input
            className={`mx-auto signup-password-input signup-input${showPasswordError ? password.length >= 8 ? '' : ' bad-input' : ''}`}
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setShowPasswordError(true)}
          />
          <span className='password-show' onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</span>
        </div>
        { showPasswordError &&
          <p className='error-message'>{password.length >= 8 ? null : 'Password should be 8 characters or more'}</p>
        }

        {/* <p className='error-message'>{loginError === 'Invalid Username or Password' && loginError}</p> */}

        <div className='submit-button'>
          <button
            className='btn btn-info signup-button'
            disabled={isDisabled}
          >
            Sign Up
        </button>
        </div>
        <div className='mx-auto'>
          <span id='sign-up-label' className='sign-up-label'>Have an account?</span>
          <Link className='sign-up-label sign-up-button' to='/accounts/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginError: state.loginError,
  accessToken: state.accessToken,
});

const mapDispatchToProps = {
  signup,
  getAccessToken,
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
