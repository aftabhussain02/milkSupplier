import Axios from 'axios';
import { getStorageParams, debitApi } from '../constant';
import {
  UPDATE_EDIT_DEBIT_PROPS,
  EDIT_DEBIT_SUCCESS,
  EDIT_DEBIT_ERROR,
  EDIT_DEBIT_ATTEMPT,
  INITIALIZE_EDIT_DEBIT,
} from './type';

export const initializeEditDebit = data => ({
  type: INITIALIZE_EDIT_DEBIT,
  payload: data,
});

export const updateEditDebitProps = (prop, value) => ({
  type: UPDATE_EDIT_DEBIT_PROPS,
  payload: { prop, value },
});

export const editDebit = ({ amount, id }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_DEBIT_ATTEMPT,
    });
    return Axios.post(
      `${debitApi}/${id}`,
      {
        amount,
        _method: 'put',
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: EDIT_DEBIT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_DEBIT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_DEBIT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });

export const deleteDebit = id => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: EDIT_DEBIT_ATTEMPT,
    });
    return Axios.delete(`${debitApi}/${id}`, { headers })
      .then(({ data }) => {
        console.log(data);
        dispatch({
          type: EDIT_DEBIT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: EDIT_DEBIT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: EDIT_DEBIT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
