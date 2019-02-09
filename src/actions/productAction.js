import Axios from 'axios';
import { productApi, getStorageParams } from '../constant';
import {
  FETCH_PRODUCTS,
  UPDATE_PRODUCT_PROPS,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  PRODUCT_ATTEMPT,
} from './type';

export const fetchProductsList = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(productApi, { headers })
      .then(({ data }) => {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );

export const updateProductProps = (prop, value) => ({
  type: UPDATE_PRODUCT_PROPS,
  payload: { prop, value },
});

export const addProduct = ({ name, type, units }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: PRODUCT_ATTEMPT,
    });

    return Axios.post(
      productApi,
      {
        name,
        type,
        units,
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: PRODUCT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: PRODUCT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: PRODUCT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
