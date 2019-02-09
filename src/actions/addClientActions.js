import Axios from 'axios';
import { getStorageParams, customerApi } from '../constant';
import {
  UPDATE_ADD_CLIENT_PROPS,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
  ADD_CLIENT_ATTEMPT,
} from './type';

export const updateAddClientProps = (prop, value) => ({
  type: UPDATE_ADD_CLIENT_PROPS,
  payload: { prop, value },
});

export const addClient = ({ name, email, phone, area, id, alter_phone }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: ADD_CLIENT_ATTEMPT,
    });

    return Axios.post(
      `${customerApi}`,
      {
        name,
        email,
        phone,
        area,
        alter_phone,
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: ADD_CLIENT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: ADD_CLIENT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: ADD_CLIENT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
