import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

import './Login.scss'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const [isDisabled, setDisabled] = useState(false);

  return (
    <div className='signup-card'>
      <img src={logo} alt='' className='signup-logo' />
      <p className='signup-text'>Login</p>
      <form className='login-form'
        onSubmit={event => {
          event.preventDefault();
          // doLogin();
          console.log('Nice try Bero')
        }}
      >
        <input
          className='login-username-input login-input'
          type='text'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className='login-password-input login-input'
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='submit-button'>
          <button
            className='btn btn-info login-button'
            disabled={isDisabled}
          >
            Log In
        </button>
        </div>
        <div className='mx-auto'>
          <span id='sign-up-label' className='sign-up-label'>Don't have an account?</span>
          <Link className='sign-up-label sign-up-button' to='/accounts/signup'>Sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
