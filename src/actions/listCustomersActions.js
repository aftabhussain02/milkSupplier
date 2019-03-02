import Axios from 'axios';
import _ from 'lodash';
import { getStorageParams } from '../constant/storage';
import { customerApi } from '../constant/apiUrls';
import { LIST_CUSTOMERS, SELECTED_CLIENT, SEARCH_CUSTOMERS } from './type';

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

export const searchClient = (data, search) => dispatch => {
  let newData;
  if (data && Object.keys(data).length > 0) {
    newData = _.filter(data, v =>
      _.lowerCase(v.name)
        .toString()
        .includes(_.lowerCase(search))
    );
  } else {
    newData = data;
  }
  dispatch({ type: SEARCH_CUSTOMERS, payload: newData });
};
