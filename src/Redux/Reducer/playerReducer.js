import { ADD_SCORE, PLAYER_INFO } from '../Actions/ActionConst';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
};

export default playerReducer;
