import Axios from 'axios';
import { getStorageParams } from '../constant/storage';
import { customerApi } from '../constant/apiUrls';
import { LIST_CUSTOMERS, SELECTED_CLIENT } from './type';

export const fetchCustomersList = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(customerApi, { headers })
      .then(({ data }) => {
        dispatch({
          type: LIST_CUSTOMERS,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );

export const selectedClient = data => ({
  type: SELECTED_CLIENT,
  payload: data,
});
