import Axios from 'axios';
import { productTypeApi, getStorageParams } from '../constant';
import {
  FETCH_PRODUCT_TYPES,
  UPDATE_PRODUCT_TYPE_PROPS,
  PRODUCT_TYPE_SUCCESS,
  PRODUCT_TYPE_ERROR,
  PRODUCT_TYPE_ATTEMPT,
} from './type';

export const fetchProductTypesList = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(productTypeApi, { headers })
      .then(({ data }) => {
        dispatch({
          type: FETCH_PRODUCT_TYPES,
          payload: data.data,
        });
      })
      .catch(e => console.log(e.response))
  );

export const updateProductTypeProps = (prop, value) => ({
  type: UPDATE_PRODUCT_TYPE_PROPS,
  payload: { prop, value },
});

export const addProductType = ({ name, product_id }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: PRODUCT_TYPE_ATTEMPT,
    });

    return Axios.post(
      productTypeApi,
      {
        name,
        product_id,
      },
      { headers }
    )
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: PRODUCT_TYPE_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: PRODUCT_TYPE_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: PRODUCT_TYPE_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
