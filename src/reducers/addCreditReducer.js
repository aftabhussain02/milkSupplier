import {
  UPDATE_ADD_CREDIT_PROPS,
  ADD_CREDIT_ATTEMPT,
  ADD_CREDIT_SUCCESS,
  ADD_CREDIT_ERROR,
} from '../actions/type';

const intState = {
  success: false,
  error: {},
  errorMessage: '',
  message: '',
  loading: false,
  amount: '',
  CREDIT_user_id: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_ADD_CREDIT_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case ADD_CREDIT_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case ADD_CREDIT_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case ADD_CREDIT_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
