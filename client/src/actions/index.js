import {
	FETCH_USERS,
	CLEAR_OPPONENTS,
	SELECT_OPPONENT,
	LOGIN,
	GET_ACCESS_TOKEN,
	GET_USER_DATA,
	REMOVE_ACCESS_TOKEN,
	GET_USER_IMAGES,
	UPDATE_USER,
} from '../constants';
import Cookies from 'js-cookie';

import axios from 'axios';

const fetchUsers = (from, amount, accessToken) => (dispatch) => {
	axios
		.get(`http://localhost:4000/api/users/all?from=${from}&amount${amount}&access-token=${accessToken}`)
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
			});
		});
};

const clearOpponents = () => ({
	type: CLEAR_OPPONENTS,
});

const selectOpponent = (id) => ({
	type: SELECT_OPPONENT,
	id: id,
});

const login = (email, password) => (dispatch) => {
	axios
		.post(`http://localhost:4000/api/users/login`, { email: email.toLowerCase().trim(), password: password })
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
	axios
		.post(`http://localhost:4000/api/users/token?refresh-token=${refreshToken}`)
		.then((res) => dispatch({
			type: GET_ACCESS_TOKEN,
			accessToken: res.headers['access-token'],
		}))
		.catch(() => {
			Cookies.remove('refresh-token');
		});
};

const getUserData = (accessToken) => (dispatch) => {
	console.log('Access Token', accessToken);

	axios
		.get(`http://localhost:4000/api/users?access-token=${accessToken}`)
		.then((res) => dispatch({
			type: GET_USER_DATA,
			login: res,
		}))
		.catch((err) => {
			if (err.response && err.response.status === 401)
				dispatch({ type: REMOVE_ACCESS_TOKEN });
			else Cookies.remove('refresh-token');
		});
};

const getUserImages = (accessToken) => (dispatch) => {
	axios
		.get(`http://localhost:4000/api/users?access-token=${accessToken}`)
		.then((res) => dispatch({
			type: GET_USER_IMAGES,
			userImages: res,
		}))
		.catch((err) => {
			if (err) console.log(err);
		});
};

const signup = (firstName, lastName, username, email, password) => (dispatch) => {
	axios
		.post(`http://localhost:4000/api/users`, {
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
		}));
};

const updateUser = (accessToken, firstName, lastName, username) => (dispatch) => {
	axios
		.put(`http://localhost:4000/api/users?access-token=${accessToken}`, {
			firstName,
			lastName,
			username,
		})
		.then((res) => dispatch({
			type: UPDATE_USER,
			login: res,
		}))
		.catch((err) => {
			if (err.response && err.response.status === 401)
				dispatch({ type: REMOVE_ACCESS_TOKEN });
			else Cookies.remove('refresh-token');
		});
};

export {
	fetchUsers,
	clearOpponents,
	selectOpponent,
	login,
	getAccessToken,
	getUserData,
	signup,
	updateUser,
};
