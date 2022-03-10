import { TOKEN_INFO } from '../Actions/ActionConst';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_INFO:
    return action.payload;
  default:
    return state;
  }
};

export default tokenReducer;
