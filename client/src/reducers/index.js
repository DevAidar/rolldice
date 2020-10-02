import { CanvasTexture } from 'three';
import {
  FETCH_USERS,
  CLEAR_OPPONENTS,
  SELECT_OPPONENT,
} from '../constants';

const INITIAL_STATE = {
  dice: [
    // {
    //   _id: "5f76908b0a5139699ed783fc",
    //   firstName: "Aidar",
    //   lastName: "Nuriev",
    //   username: "DevAidar",
    //   profileImage: "uploads/2020-10-02T02:29:30.878ZDevAidar_logo.png"
    // }
  ],
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
      return { ...state, opponents: action.res.data };
    case CLEAR_OPPONENTS:
      return { ...state, opponents: [] };
    case SELECT_OPPONENT:
      if (state.dice.length && state.dice.some((opponent) => opponent._id === action.id)) {
        return { ...state, dice: state.dice.filter((opponent) => opponent._id !== action.id) }
      }

      const ctx = document.createElement('canvas').getContext('2d');
      const img = new Image();
      img.src = state.opponents.find((opponent) => opponent._id === action.id).profileImage;
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

      return { ...state, dice: [...state.dice, { ...state.opponents.find((opponent) => opponent._id === action.id), diceTexture: new CanvasTexture(ctx.canvas) }] }
    default:
      return { ...state };
  }
};

export default rootReducer;
