import Axios from 'axios';
import { getStorageParams, vendorApi } from '../constant';
import {
  UPDATE_ADD_VENDOR_PROPS,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_ERROR,
  ADD_VENDOR_ATTEMPT,
} from './type';

export const updateAddVendorProps = (prop, value) => ({
  type: UPDATE_ADD_VENDOR_PROPS,
  payload: { prop, value },
});

export const addVendor = ({
  name,
  email,
  phone,
  product_id,
  alter_phone,
}) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: ADD_VENDOR_ATTEMPT,
    });

    return Axios.post(
      `${vendorApi}`,
      { name, email, phone, product_id, alter_phone },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: ADD_VENDOR_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: ADD_VENDOR_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: ADD_VENDOR_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
