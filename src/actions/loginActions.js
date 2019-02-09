import { AsyncStorage } from 'react-native';
import Axios from 'axios';
import { UPDATE_LOGIN_PROPS, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_ERROR } from './type';
import { loginApi } from '../constant/apiUrls';
import { tokenName } from '../constant/storage';

export const updateLoginProp = ({ prop, value }) => ({
  type: UPDATE_LOGIN_PROPS,
  payload: { prop, value },
});

export const attemptLogin = (email, password) => async dispatch => {
  dispatch({
    type: LOGIN_ATTEMPT,
  });
  return Axios.post(loginApi, { email, password })
    .then(async ({ data }) => {
      try {
        await AsyncStorage.setItem(tokenName, `Bearer ${data.data.token}`);
      } catch (e) {
        return console.log(data);
      }

      return dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    })
    .catch(e => {
      console.log(e.response.data);
      if (!e.success) {
        return dispatch({
          type: LOGIN_ERROR,
          payload: e.response.data,
        });
      }

      return dispatch({
        type: LOGIN_ERROR,
        payload: { message: 'Something went wrong!' },
      });
    });
};
