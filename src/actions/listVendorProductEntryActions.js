import Axios from 'axios';
import moment from 'moment';
import { getStorageParams } from '../constant/storage';
import { filterVendorProductApi } from '../constant/apiUrls';
import { LIST_VENDOR_PRODUCT_ENTRIES } from './type';

export const fetchFilterVendorsList = (date = moment().format('YYYY-MM-DD')) => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(`${filterVendorProductApi}`, { headers })
      .then(({ data }) => {
        console.log(date);
        dispatch({  
          type: LIST_VENDOR_PRODUCT_ENTRIES,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );
