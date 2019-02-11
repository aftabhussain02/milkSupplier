import Axios from 'axios';
import { getStorageParams, productEntryApi } from '../constant';
import {
  UPDATE_EDIT_PRODUCT_ENTRY_PROPS,
  EDIT_PRODUCT_ENTRY_SUCCESS,
  EDIT_PRODUCT_ENTRY_ERROR,
  EDIT_PRODUCT_ENTRY_ATTEMPT,
  INITIALIZE_EDIT_PRODUCT_ENTRY,
} from './type';

export const initializeEditProductEntry = data => ({
  type: INITIALIZE_EDIT_PRODUCT_ENTRY,
  payload: data,
});

export const updateEditProductEntryProps = (prop, value) => ({
  type: UPDATE_EDIT_PRODUCT_ENTRY_PROPS,
  payload: { prop, value },
});

export const editProductEntry = ({ product_id, unit_type, amount, qty, id }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_PRODUCT_ENTRY_ATTEMPT,
    });
    return Axios.post(
      `${productEntryApi}/${id}`,
      {
        product_id,
        unit_type,
        amount,
        qty,
        _method: 'put',
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: EDIT_PRODUCT_ENTRY_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_PRODUCT_ENTRY_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_PRODUCT_ENTRY_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });

export const deleteProductEntry = id => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_PRODUCT_ENTRY_ATTEMPT,
    });
    return Axios.delete(`${productEntryApi}/${id}`, { headers })
      .then(({ data }) => {
        dispatch({
          type: EDIT_PRODUCT_ENTRY_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_PRODUCT_ENTRY_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_PRODUCT_ENTRY_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
