import loginReducer from './loginReducer';
import pageReducer from './pageReducers';
import gridlistReducer from './gridlistReducer';
import collectionReducer from './collectionReducer';
import chipsReducer from './chipsReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    login: loginReducer,
    page: pageReducer,
    listHelp: gridlistReducer,
    collectionHelp: collectionReducer,
    chips: chipsReducer
})

export default allReducers;