import {
	FETCH_USERS,
} from '../constants';

import axios from 'axios';

const fetchUsers = (to, from) => (dispatch) => {
  axios
    .get(`http://localhost:5000/users?to=${to}&from${from}`)
    .then((res) => dispatch({
      type: FETCH_USERS,
      usersData: res,
    }))
    .catch((res) => {
      console.log(res);
      return dispatch({
        type: FETCH_USERS,
        usersData: {
          status: 404,
        },
      })
    })
}

// const fetchVirusData = () => (dispatch) => {
// 	axios
// 		.get('https://api.covid19api.com/all')
// 		.then((res) => {
// 			return dispatch({
// 				type: FETCH_VIRUS_DATA,
// 				virusData: res,
// 			});
// 		})
// 		.catch((res) => {
// 			console.error(res);
// 			return dispatch({
// 				type: FETCH_VIRUS_DATA,
// 				virusData: {
// 					status: 404,
// 				},
// 			});
// 		});
// };

export {
	fetchUsers
};
