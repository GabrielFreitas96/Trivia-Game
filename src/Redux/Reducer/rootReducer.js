import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers(
  {
    players: playerReducer, token: tokenReducer, timer: timerReducer,
  },
);

export default rootReducer;
