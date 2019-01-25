import Axios from 'axios';
import { fetchProductsApi, getStorageParams } from '../constant';
import {
  FETCH_PRODUCTS,
  UPDATE_PRODUCT_PROPS,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
  PRODUCT_ATTEMPT,
} from './type';

export const fetchProductsList = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(fetchProductsApi, { headers })
      .then(({ data }) => {
        dispatch({
          type: FETCH_PRODUCTS,
          payload: data.data,
        });
      })
      .catch(e => console.log(e.response))
  );
