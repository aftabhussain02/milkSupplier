import Axios from 'axios';
import { getStorageParams, creditApi } from '../constant';
import {
  UPDATE_ADD_CREDIT_PROPS,
  ADD_CREDIT_SUCCESS,
  ADD_CREDIT_ERROR,
  ADD_CREDIT_ATTEMPT,
  CREDIT_LIST,
} from './type';

export const updateAddCreditProps = (prop, value) => ({
  type: UPDATE_ADD_CREDIT_PROPS,
  payload: { prop, value },
});

export const addCredit = ({ id: credit_user_id, amount }) => dispatch =>
  getStorageParams().then(({ headers }) => {
    dispatch({
      type: ADD_CREDIT_ATTEMPT,
    });

    return Axios.post(
      `${creditApi}`,
      {
        credit_user_id,
        amount,
      },
      { headers }
    )
      .then(({ data }) => {
        dispatch({
          type: ADD_CREDIT_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        console.log(error.response.data);
        if (!error.response.data.success) {
          return dispatch({
            type: ADD_CREDIT_ERROR,
            payload: error.response.data,
          });
        }
        return dispatch({
          type: ADD_CREDIT_ERROR,
          payload: { message: 'Something went wrong' },
        });
      });
  });

export const fetchCredit = () => dispatch =>
  getStorageParams().then(({ headers }) =>
    Axios.get(`${creditApi}`, { headers })
      .then(({ data }) => {
        dispatch({
          type: CREDIT_LIST,
          payload: data.data,
        });
      })
      .catch(e => console.log(e))
  );
