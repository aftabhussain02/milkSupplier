import Axios from 'axios';
import { getStorageParams, vendorApi } from '../constant';
import {
  UPDATE_EDIT_VENDOR_PROFILE_PROPS,
  EDIT_VENDOR_PROFILE_SUCCESS,
  EDIT_VENDOR_PROFILE_ERROR,
  EDIT_VENDOR_PROFILE_ATTEMPT,
  INITIALIZE_EDIT_VENDOR,
} from './type';

export const initializeEditVendor = data => ({
  type: INITIALIZE_EDIT_VENDOR,
  payload: data,
});

export const updateEditVendorProps = (prop, value) => ({
  type: UPDATE_EDIT_VENDOR_PROFILE_PROPS,
  payload: { prop, value },
});

export const editVendor = ({ name, email, phone, product_id, product_type_id, id }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    console.log(name, email, phone, product_id, product_type_id);
    dispatch({
      type: EDIT_VENDOR_PROFILE_ATTEMPT,
    });

    return Axios.post(
      `${vendorApi}/${id}`,
      {
        name,
        email,
        phone,
        product_id,
        product_type_id,
        _method: 'put',
      },
      { headers }
    )
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: EDIT_VENDOR_PROFILE_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_VENDOR_PROFILE_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_VENDOR_PROFILE_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
