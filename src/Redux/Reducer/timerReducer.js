import { TIMER } from '../Actions/ActionConst';

const INITIAL_STATE = 30;

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER:
    return action.payload;
  default:
    return state;
  }
};

export default timerReducer;
