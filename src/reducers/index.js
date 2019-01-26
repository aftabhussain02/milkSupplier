import { combineReducers } from 'redux';
import { navReducer } from '../route/ReduxNavigator';
import login from './loginReducer';
import listCustomer from './listCustomerReducer';
import fetchProduct from './fetchProductsReducer';
import productEntry from './productEntryReducer';
import editClient from './editClientReducer';
import listVendor from './listVendorReducer';
import vendorProductEntry from './vendorProductEntryReducer';
import editVendor from './editVendorReducer';
import addProduct from './addProduct';
import addProductType from './addProductTypeReducer';
import addClient from './addClientReducer';
import addVendor from './addVendorReducer';
import addDebit from './addDebitReducer';
import addCredit from './addCreditReducer';

export default combineReducers({
  nav: navReducer,
  login,
  listCustomer,
  fetchProduct,
  productEntry,
  editClient,
  listVendor,
  vendorProductEntry,
  editVendor,
  addProduct,
  addProductType,
  addClient,
  addVendor,
  addDebit,
  addCredit,
});
