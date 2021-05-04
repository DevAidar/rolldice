import { CanvasTexture } from 'three';
import {
  FETCH_USERS,
  CLEAR_OPPONENTS,
  SELECT_OPPONENT,
  LOGIN,
  FETCH_USER_DATA,
  GET_ACCESS_TOKEN,
  GET_USER_IMAGES,
  GET_USER_DATA,
  REMOVE_ACCESS_TOKEN,
} from '../constants';

const INITIAL_STATE = {
  dice: [],
  loggedIn: false,
  loginError: '',
  userId: '',
  username: '',
  profileImage: '',
  images: [],
  accessToken: '',
  opponents: [],
};

const rootReducer = (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, opponents: action.res.data };
    case CLEAR_OPPONENTS:
      return { ...state, opponents: [] };
    case SELECT_OPPONENT:
      if (state.dice.length && state.dice.some((opponent) => opponent._id === action.id)) {
        return { ...state, dice: state.dice.filter((opponent) => opponent._id !== action.id) }
      }

      const ctx = document.createElement('canvas').getContext('2d');
      const img = new Image();
      img.src = 'https://roll-dice-app.herokuapp.com/' + state.opponents.find((opponent) => opponent._id === action.id).profileImage;
      img.onload = () => {
        ctx.canvas.width = 256;
        ctx.canvas.height = 256;

        ctx.beginPath();
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#636e72';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          ctx.canvas.width * .05,
          ctx.canvas.height * .05,
          ctx.canvas.width * .9,
          ctx.canvas.height * .9,
        );
        ctx.closePath();
      };

      return { 
        ...state, 
        dice: [...state.dice, { ...state.opponents.find((opponent) => opponent._id === action.id), diceTexture: new CanvasTexture(ctx.canvas) }] 
      };
    case LOGIN:
      console.log('status', action, action.login.status);
      return {
        ...state,
        accessToken: action.login.headers ? action.login.headers['access-token'] : '',
        loggedIn: action.login.status === 200,
        loginError: action.error ? action.error : '',
      };
    case FETCH_USER_DATA: 
      return {
        ...state,
        username: action.data.username,
        profileImage: action.data.profileImage,
      }
    case GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        loggedIn: true,
      }
    case GET_USER_DATA:
      console.log(action.login, {
        ...state,
        username: action.login.data.username,
        profileImage: action.login.data.profileImage,
      });
      return {
        ...state,
        userId: action.login.data.userId,
        username: action.login.data.username,
        profileImage: action.login.data.profileImage,
      }
    case GET_USER_IMAGES:
      return {
        images: action.userImages.data.images,
      }
    case REMOVE_ACCESS_TOKEN: 
      return {
        ...state,
        accessToken: '',
      } 
    default:
      return { ...state };
  }
};

export default rootReducer;
