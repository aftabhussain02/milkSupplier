import Axios from 'axios';
import { getStorageParams, customerApi } from '../constant';
import {
  UPDATE_EDIT_CLIENT_PROFILE_PROPS,
  EDIT_CLIENT_PROFILE_SUCCESS,
  EDIT_CLIENT_PROFILE_ERROR,
  EDIT_CLIENT_PROFILE_ATTEMPT,
  INITIALIZE_EDIT_CLIENT,
} from './type';

export const initializeEditClient = data => ({
  type: INITIALIZE_EDIT_CLIENT,
  payload: data,
});

export const updateEditClientProps = (prop, value) => ({
  type: UPDATE_EDIT_CLIENT_PROFILE_PROPS,
  payload: { prop, value },
});

export const editClient = ({ name, email, phone, area, id }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_CLIENT_PROFILE_ATTEMPT,
    });

    return Axios.post(
      `${customerApi}/${id}`,
      {
        name,
        email,
        phone,
        area,
        _method: 'put',
      },
      { headers }
    )
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: EDIT_CLIENT_PROFILE_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_CLIENT_PROFILE_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_CLIENT_PROFILE_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
