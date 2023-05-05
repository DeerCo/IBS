import { combineReducers } from 'redux';
import CustomizerReducer from './customizer/CustomizerReducer';

const RootReducers = combineReducers({
  CustomizerReducer,
});

export default RootReducers;
