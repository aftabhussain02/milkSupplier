import Axios from 'axios';
import { getStorageParams } from '../constant/storage';
import { vendorApi } from '../constant/apiUrls';
import { LIST_VENDORS, SELECTED_VENDOR } from './type';

export const fetchvendorsList = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(vendorApi, { headers })
      .then(({ data }) => {
        console.log(data);
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
