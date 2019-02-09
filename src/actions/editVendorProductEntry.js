import Axios from 'axios';
import { getStorageParams, vendorProductEntryApi } from '../constant';
import {
  UPDATE_EDIT_VENDOR_PRODUCT_ENTRY_PROPS,
  EDIT_VENDOR_PRODUCT_ENTRY_SUCCESS,
  EDIT_VENDOR_PRODUCT_ENTRY_ERROR,
  EDIT_VENDOR_PRODUCT_ENTRY_ATTEMPT,
  INITIALIZE_EDIT_VENDOR_PRODUCT_ENTRY,
} from './type';

export const initializeEditVendorProductEntry = data => ({
  type: INITIALIZE_EDIT_VENDOR_PRODUCT_ENTRY,
  payload: data,
});

export const updateEditVendorProductEntryProps = (prop, value) => ({
  type: UPDATE_EDIT_VENDOR_PRODUCT_ENTRY_PROPS,
  payload: { prop, value },
});

export const editVendorProductEntry = ({
  product_id,
  product_type_id,
  amount,
  qty,
  id,
  alter_phone,
}) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_VENDOR_PRODUCT_ENTRY_ATTEMPT,
    });
    return Axios.post(
      `${vendorProductEntryApi}/${id}`,
      {
        product_id,
        product_type_id,
        amount,
        qty,
        alter_phone,
        _method: 'put',
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: EDIT_VENDOR_PRODUCT_ENTRY_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_VENDOR_PRODUCT_ENTRY_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_VENDOR_PRODUCT_ENTRY_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });

export const deleteVendorProductEntry = id => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_VENDOR_PRODUCT_ENTRY_ATTEMPT,
    });
    return Axios.delete(`${vendorProductEntryApi}/${id}`, { headers })
      .then(({ data }) => {
        dispatch({
          type: EDIT_VENDOR_PRODUCT_ENTRY_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_VENDOR_PRODUCT_ENTRY_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_VENDOR_PRODUCT_ENTRY_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
