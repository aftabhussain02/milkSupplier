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
import listClientProductEntry from './listClientProductEntryReducer';
import editProductEntry from './editProductEntryReducer';
import listVendorProductEntry from './listVendorProductEntryReducer';
import editVendorProductEntry from './editVendorProductEntry';
import changePassword from './changePasswordReducer';
import dashboard from './dashboardReducer';
import listCredit from './listCreditReducer';
import listDebit from './listDebitReducer';
import editCredit from './editCreditReducer';
import editDebit from './editDebitReducer';
import notes from './notesReducer';

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
  listClientProductEntry,
  editProductEntry,
  listVendorProductEntry,
  editVendorProductEntry,
  changePassword,
  dashboard,
  listCredit,
  listDebit,
  editCredit,
  editDebit,
  notes,
});
