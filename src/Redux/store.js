import {createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import vacancy from './Reducers/vacancyReducer';

const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
    vacancy:vacancy, 
});


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store; 