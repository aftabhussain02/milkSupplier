import {
  UPDATE_EDIT_DEBIT_PROPS,
  EDIT_DEBIT_ATTEMPT,
  EDIT_DEBIT_SUCCESS,
  EDIT_DEBIT_ERROR,
  INITIALIZE_EDIT_DEBIT,
} from '../actions/type';

const intState = {
  amount: '',
  error: {},
  success: false,
  loading: false,
  errorMessage: '',
  message: '',
  id: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case INITIALIZE_EDIT_DEBIT:
      return { ...state, ...action.payload };
    case UPDATE_EDIT_DEBIT_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case EDIT_DEBIT_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case EDIT_DEBIT_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case EDIT_DEBIT_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
