import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware'
import starwarsReducer from './ducks/starwars';

const reducer = combineReducers( {
    starwars: starwarsReducer
} )

export default createStore(
    reducer,
    applyMiddleware( reduxPromiseMiddleware() ) 
);