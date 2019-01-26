import {
  UPDATE_ADD_DEBIT_PROPS,
  ADD_DEBIT_ATTEMPT,
  ADD_DEBIT_SUCCESS,
  ADD_DEBIT_ERROR,
} from '../actions/type';

const intState = {
  success: false,
  error: {},
  errorMessage: '',
  message: '',
  loading: false,
  amount: '',
  debit_user_id: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_ADD_DEBIT_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case ADD_DEBIT_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case ADD_DEBIT_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case ADD_DEBIT_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
