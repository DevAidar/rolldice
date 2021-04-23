import {
  FETCH_USERS,
  CLEAR_OPPONENTS,
  SELECT_OPPONENT,
  LOGIN,
  GET_ACCESS_TOKEN,
  GET_USER_DATA,
  REMOVE_ACCESS_TOKEN,
} from '../constants';
import Cookies from 'js-cookie';

import axios from 'axios';

const fetchUsers = (from, amount, accessToken) => (dispatch) => {
  console.log('sup')
  axios
    .get(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://roll-dice-app.herokuapp.com'}/api/users/all?from=${from}&amount${amount}&access-token=${accessToken}`)
    .then((res) => dispatch({
      type: FETCH_USERS,
      res: res,
    }))
    .catch((res) => {
      return dispatch({
        type: FETCH_USERS,
        res: {
          status: 404,
        },
      })
    })
}

const clearOpponents = () => ({
  type: CLEAR_OPPONENTS
});

const selectOpponent = (id) => ({
  type: SELECT_OPPONENT,
  id: id,
})

const login = (username, password) => (dispatch) => {
  axios
    .post(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://roll-dice-app.herokuapp.com'}/api/users/login`, { email: username.toLowerCase(), password: password })
    .then((res) => {
      Cookies.set('refresh-token', res.headers['refresh-token'], { expires: 30 });

      return dispatch({
        type: LOGIN,
        login: res,
      });
    })
    .catch((err) => {
      return dispatch({
        type: LOGIN,
        login: {
          status: err.response && err.response.status || 404,
        },
        error: err.response && err.response.data || '404 Error',
      });
    });
};

const getAccessToken = (refreshToken) => (dispatch) => {
  console.log('TRYING', refreshToken)
  axios
    .post(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://roll-dice-app.herokuapp.com'}/api/users/token?refresh-token=${refreshToken}`)
    .then((res) => dispatch({
      type: GET_ACCESS_TOKEN,
      accessToken: res.headers['access-token'],
    }))
    .catch(() => {
      Cookies.remove('refresh-token');
    })
}

const getUserData = (accessToken) => (dispatch) => {
  axios
    .get(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://roll-dice-app.herokuapp.com'}/api/users?access-token=${accessToken}`)
    .then((res) => dispatch({
      type: GET_USER_DATA,
      login: res,
    }))
    .catch((err) => {
      if (err.response && err.response.status === 401)
        dispatch({ type: REMOVE_ACCESS_TOKEN });
      else Cookies.remove('refresh-token');
    })
}

const signup = (firstName, lastName, username, email, password) => (dispatch) => {
  axios
    .post(`${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://roll-dice-app.herokuapp.com'}/api/users`, {
      firstName,
      lastName,
      username,
      email,
      password,
    })
    .then((res) => {
      Cookies.set('refresh-token', res.headers['refresh-token'], { expires: 30 });

      return dispatch({
        type: LOGIN,
        login: res,
      });
    })
    .catch((err) => dispatch({
      type: LOGIN,
      login: {
        status: err.response.status,
      },
      error: err.response.data,
    }))
}

export {
  fetchUsers,
  clearOpponents,
  selectOpponent,
  login,
  getAccessToken,
  getUserData,
  signup,
};
