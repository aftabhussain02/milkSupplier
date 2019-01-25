import { combineReducers } from 'redux';
import { navReducer } from '../route/ReduxNavigator';
import login from './loginReducer';
import listCustomer from './listCustomerReducer';
import fetchProduct from './fetchProductsReducer';
import productEntry from './productEntryReducer';
import editClient from './editClientReducer';
import listVendor from './listVendorReducer';

export default combineReducers({
  nav: navReducer,
  login,
  listCustomer,
  fetchProduct,
  productEntry,
  editClient,
  listVendor,
});
