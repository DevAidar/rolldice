// import {
// 	FETCH_VIRUS_DATA,
// } from '../constants';

const INITIAL_STATE = {
	dice: [],
	loggedIn: false,
	username: '',
	gameStarted: false,
	diceLanded: false,
	gameFinished: false,
};

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	default:
		return { ...state };
	}
};

export default rootReducer;
