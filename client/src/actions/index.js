import {
  FETCH_USERS,
  CLEAR_OPPONENTS,
  SELECT_OPPONENT,
  LOGIN,
} from '../constants';

import axios from 'axios';

const fetchUsers = (from, amount) => (dispatch) => {
  console.log('sup')
  axios
    .get(`https://roll-dice-app.herokuapp.com/api/users?from=${from}&amount${amount}`)
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
      return dispatch({
        type: LOGIN,
        login: res,
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err.response);
      return dispatch({
        type: LOGIN,
        login: {
          status: err.response.status,
        },
        error: err.response.data,
      });
    });
};

export {
  fetchUsers,
  clearOpponents,
  selectOpponent,
  login,
};
