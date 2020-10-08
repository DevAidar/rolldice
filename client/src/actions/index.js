import {
  FETCH_USERS,
  CLEAR_OPPONENTS,
  SELECT_OPPONENT,
  LOGIN,
  GET_ACCESS_TOKEN,
  GET_USER_DATA,
} from '../constants';
import Cookies from 'js-cookie';

import axios from 'axios';

const fetchUsers = (from, amount, accessToken) => (dispatch) => {
  console.log('sup')
  axios
    .get(`http://localhost:5000/api/users/all?from=${from}&amount${amount}&access-token=${accessToken}`)
    .then((res) => dispatch({
      type: FETCH_USERS,
      res: res,
    }))
    .catch((res) => {
      console.log(res);
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
    .post(`https://roll-dice-app.herokuapp.com/api/users/login`, { email: username.toLowerCase(), password: password })
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
      
      Cookies.set('refresh-token', res.headers['refresh-token'], { expires: 30 });

      return dispatch({
        type: LOGIN,
        login: res,
      });
    })
    .catch((err) => {
      console.log(err.response)
      return dispatch({
        type: LOGIN,
        login: {
          status: err.response.status,
        },
        error: err.response.data,
      });
    });
};

const getAccessToken = (refreshToken) => (dispatch) => {
  console.log('TRYING', refreshToken)
  axios
    .post(`http://localhost:5000/api/users/token?refresh-token=${refreshToken}`)
    .then((res) => dispatch({
      type: GET_ACCESS_TOKEN,
      accessToken: res.headers['access-token'],
    }))
    .catch((err) => {
      console.error(err);
      Cookies.remove('refresh-token');
    })
}

const getUserData = (accessToken) => (dispatch) => {
  axios
    .get(`http://localhost:5000/api/users?access-token=${accessToken}`)
    .then((res) => dispatch({
      type: GET_USER_DATA,
      login: res,
    }))
    .catch((err) => {
      if (err.response && err.response.status === 401)
        console.log('trying to get new access token')
      console.log(err.response)
    })
}

export {
  fetchUsers,
  clearOpponents,
  selectOpponent,
  login,
  getAccessToken,
  getUserData,
};
