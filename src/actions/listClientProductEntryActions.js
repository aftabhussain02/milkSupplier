import Axios from 'axios';
import moment from 'moment';
import { getStorageParams } from '../constant/storage';
import { filterClientProductApi } from '../constant/apiUrls';
import { LIST_CLIENT_PRODUCT_ENTRIES } from './type';

export const fetchFilterClientsList = (date = moment().format('YYYY-MM-DD')) => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(`${filterClientProductApi}/${date}`, { headers })
      .then(({ data }) => {
        dispatch({
          type: LIST_CLIENT_PRODUCT_ENTRIES,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );
