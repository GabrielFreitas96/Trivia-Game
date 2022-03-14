import { ADD_SCORE, PLAYER_INFO, RIGHT_QUESTIONS } from '../Actions/ActionConst';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarURL: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      gravatarURL: action.payload.gravatarURL,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload.score + state.score,
    };
  case RIGHT_QUESTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
