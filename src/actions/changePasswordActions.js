import Axios from 'axios';
import { getStorageParams, changePasswordApi } from '../constant';
import {
  UPDATE_CHANGE_PASSWORD_PROPS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_ATTEMPT,
} from './type';

export const updateChangePasswordProps = (prop, value) => ({
  type: UPDATE_CHANGE_PASSWORD_PROPS,
  payload: { prop, value },
});

export const changePassword = ({ current_password, password, confirm_password }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: CHANGE_PASSWORD_ATTEMPT,
    });

    return Axios.post(
      `${changePasswordApi}`,
      { current_password, password, confirm_password },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: CHANGE_PASSWORD_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: CHANGE_PASSWORD_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
