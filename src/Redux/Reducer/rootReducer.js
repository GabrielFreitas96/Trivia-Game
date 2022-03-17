import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';
import timerReducer from './timerReducer';
import settingReducer from './settingReducer';

const rootReducer = combineReducers(
  {
    player: playerReducer, token: tokenReducer, timer: timerReducer, setting: settingReducer,
  },
);

export default rootReducer;
