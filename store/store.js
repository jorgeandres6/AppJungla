import { createStore, combineReducers } from 'redux';
import carritoReducer from './Producto/reducer';

const configureStore = () => createStore(carritoReducer);

export default configureStore;