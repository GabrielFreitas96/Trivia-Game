import { ADD_CATEGORY, ADD_DIFFICULTY, ADD_TYPE } from '../Actions/ActionConst';

const INITIAL_STATE = {
  category:'',
  difficulty: '',
  type: '',
};

const settingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CATEGORY:
    return {
      ...state,
      category: action.payload,
    };
    case ADD_DIFFICULTY:
    return {
      ...state,
      difficulty: action.payload,
    };
    case ADD_TYPE:
      return {
        ...state,
        type: action.payload,
      };
  default:
    return state;
  }
};

export default settingReducer;
