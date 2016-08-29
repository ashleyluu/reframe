import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';

const rootReducer = combineReducers({
  auth,
  profile
});

export default rootReducer;
