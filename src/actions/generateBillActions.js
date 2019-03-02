import Axios from 'axios';
import { generateBillApi, getStorageParams } from '../constant';

export const generatePdf = user_id => dispatch =>
  getStorageParams().then(({ headers }) => {
    console.log(generateBillApi + user_id);
    return Axios.get(generateBillApi + user_id, { headers })
      .then(({ data }) => Promise.resolve(data.data))
      .catch(e => Promise.reject(e.response.data));
  });
