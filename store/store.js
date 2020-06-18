import { createStore, combineReducers } from 'redux';
import carritoReducer from './reducer';

const configureStore = () => createStore(carritoReducer);

export default configureStore;