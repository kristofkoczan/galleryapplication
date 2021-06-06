import loginReducer from './loginReducer';
import pageReducer from './pageReducers';
import gridlistReducer from './gridlistReducer';
import collectionReducer from './collectionReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    login: loginReducer,
    page: pageReducer,
    listHelp: gridlistReducer,
    collectionHelp: collectionReducer,
})

export default allReducers;