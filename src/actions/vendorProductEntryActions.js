import Axios from 'axios';
import { getStorageParams, addVendorProductEntryApi } from '../constant';
import {
  UPDATE_VENDOR_PRODUCT_ENTRY_PROPS,
  VENDOR_PRODUCT_ENTRY_SUCCESS,
  VENDOR_PRODUCT_ENTRY_ERROR,
  VENDOR_PRODUCT_ENTRY_ATTEMPT,
} from './type';

export const updateVendorProductEntryProps = (prop, value) => ({
  type: UPDATE_VENDOR_PRODUCT_ENTRY_PROPS,
  payload: { prop, value },
});

export const addVendorProductEntry = ({
  product_id,
  product_type_id,
  amount,
  user_id,
  qty,
}) => dispatch =>
  getStorageParams().then(({ headers }) => {
    console.log(addVendorProductEntryApi);
    dispatch({
      type: VENDOR_PRODUCT_ENTRY_ATTEMPT,
    });

    return Axios.post(
      addVendorProductEntryApi,
      {
        product_id,
        product_type_id,
        amount,
        user_id,
        qty,
      },
      { headers }
    )
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: VENDOR_PRODUCT_ENTRY_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: VENDOR_PRODUCT_ENTRY_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: VENDOR_PRODUCT_ENTRY_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
