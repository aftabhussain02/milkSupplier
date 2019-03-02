import Axios from 'axios';
import { getStorageParams } from '../constant/storage';
import { dashboardApi } from '../constant/apiUrls';
import { FETCH_DASHBOARD } from './type';

export const fetchDashboard = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(dashboardApi, { headers })
      .then(({ data }) => {
        console.log(headers);
        dispatch({
          type: FETCH_DASHBOARD,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );
