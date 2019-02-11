import Axios from 'axios';
import { getStorageParams, debitApi } from '../constant';
import {
  UPDATE_ADD_DEBIT_PROPS,
  ADD_DEBIT_SUCCESS,
  ADD_DEBIT_ERROR,
  ADD_DEBIT_ATTEMPT,
} from './type';

export const updateAddDebitProps = (prop, value) => ({
  type: UPDATE_ADD_DEBIT_PROPS,
  payload: { prop, value },
});

export const addDebit = ({ id: debit_user_id, amount }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: ADD_DEBIT_ATTEMPT,
    });

    return Axios.post(
      `${debitApi}`,
      {
        debit_user_id,
        amount,
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: ADD_DEBIT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: ADD_DEBIT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: ADD_DEBIT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });
