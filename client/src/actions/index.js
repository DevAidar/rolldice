import {
  FETCH_USERS,
  CLEAR_OPPONENTS,
  SELECT_OPPONENT,
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

export {
  fetchUsers,
  clearOpponents,
  selectOpponent,
};
