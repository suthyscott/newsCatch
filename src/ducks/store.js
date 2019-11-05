import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
    authReducer,
    articleReducer
})

export default createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware)
)