import {
	FETCH_USERS,
} from '../constants';

const INITIAL_STATE = {
	dice: [],
	loggedIn: false,
	username: '',
	gameStarted: false,
	diceLanded: false,
  gameFinished: false,
  opponents: [],
};

const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
  case FETCH_USERS:
    return { ...state };
	default:
		return { ...state };
	}
};

export default rootReducer;
