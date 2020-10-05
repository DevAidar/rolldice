import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { login } from '../../actions';

import logo from '../../images/logo.png';

import './Login.scss'

const Login = ({ login, token, loginError }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const [isDisabled, setDisabled] = useState(false);
  
	const onSubmit = e => {
    e.preventDefault();
    
		setPassword('');
		setDisabled(true);

		login(email.toLowerCase(), password);
  };

  useEffect(() => {
    if (token || loginError)
      setDisabled(false);
    if (token)
      history.push('/info');
  }, [token, loginError])

  return (
    <div className='signup-card'>
      <img src={logo} alt='' className='signup-logo' />
      <p className='signup-text'>Login</p>
      <form className='login-form'
        onSubmit={e => onSubmit(e)}
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

const mapStateToProps = (state) => ({
	username: state.username,
	token: state.token,
});

const mapDispatchToProps = {
	login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
