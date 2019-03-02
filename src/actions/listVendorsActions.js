import Axios from 'axios';
import _ from 'lodash';
import { getStorageParams } from '../constant/storage';
import { vendorApi } from '../constant/apiUrls';
import { LIST_VENDORS, SELECTED_VENDOR, SEARCH_VENDORS } from './type';

export const fetchvendorsList = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(vendorApi, { headers })
      .then(({ data }) => {
        dispatch({
          type: LIST_VENDORS,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );

export const selectedVendor = data => ({
  type: SELECTED_VENDOR,
  payload: data,
});

export const searchVendor = (data, search) => dispatch => {
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
  dispatch({ type: SEARCH_VENDORS, payload: newData });
};
