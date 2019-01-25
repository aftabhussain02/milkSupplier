import Axios from 'axios';
import { getStorageParams, addProductEntryApi } from '../constant';
import {
  UPDATE_PRODUCT_ENTRY_PROPS,
  PRODUCT_ENTRY_SUCCESS,
  PRODUCT_ENTRY_ERROR,
  PRODUCT_ENTRY_ATTEMPT,
} from './type';

export const updateProductEntryProps = (prop, value) => ({
  type: UPDATE_PRODUCT_ENTRY_PROPS,
  payload: { prop, value },
});

export const addProductEntry = ({
  product_id,
  product_type_id,
  amount,
  user_id,
  qty,
}) => dispatch =>
  getStorageParams().then(({ headers }) => {
    console.log(addProductEntryApi);
    dispatch({
      type: PRODUCT_ENTRY_ATTEMPT,
    });

    return Axios.post(
      addProductEntryApi,
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
          type: PRODUCT_ENTRY_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: PRODUCT_ENTRY_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: PRODUCT_ENTRY_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
