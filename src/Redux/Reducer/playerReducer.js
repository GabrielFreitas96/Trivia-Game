import { PLAYER_INFO } from '../Actions/ActionConst';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  default:
    return state;
  }
};

export default playerReducer;
