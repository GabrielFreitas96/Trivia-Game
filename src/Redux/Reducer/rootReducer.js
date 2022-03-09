import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ players: playerReducer, token: tokenReducer });

export default rootReducer;
