import Axios from 'axios';
import { getStorageParams, creditApi } from '../constant';
import {
  UPDATE_EDIT_CREDIT_PROPS,
  EDIT_CREDIT_SUCCESS,
  EDIT_CREDIT_ERROR,
  EDIT_CREDIT_ATTEMPT,
  INITIALIZE_EDIT_CREDIT,
} from './type';

export const initializeEditCredit = data => ({
  type: INITIALIZE_EDIT_CREDIT,
  payload: data,
});

export const updateEditCreditProps = (prop, value) => ({
  type: UPDATE_EDIT_CREDIT_PROPS,
  payload: { prop, value },
});

export const editCredit = ({ amount, id }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_CREDIT_ATTEMPT,
    });
    return Axios.post(
      `${creditApi}/${id}`,
      {
        amount,
        _method: 'put',
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: EDIT_CREDIT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_CREDIT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_CREDIT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });

export const deleteCredit = id => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_CREDIT_ATTEMPT,
    });
    return Axios.delete(`${creditApi}/${id}`, { headers })
      .then(({ data }) => {
        dispatch({
          type: EDIT_CREDIT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_CREDIT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_CREDIT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
