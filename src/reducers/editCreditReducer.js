import {
  UPDATE_EDIT_CREDIT_PROPS,
  EDIT_CREDIT_ATTEMPT,
  EDIT_CREDIT_SUCCESS,
  EDIT_CREDIT_ERROR,
  INITIALIZE_EDIT_CREDIT,
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
    case INITIALIZE_EDIT_CREDIT:
      return { ...state, ...action.payload };
    case UPDATE_EDIT_CREDIT_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case EDIT_CREDIT_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case EDIT_CREDIT_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case EDIT_CREDIT_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
