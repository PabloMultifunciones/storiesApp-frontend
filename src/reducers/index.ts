import { combineReducers } from 'redux';
import historyReducer from './historyReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
    historyReducer,
    loginReducer,
});

export default reducers;
