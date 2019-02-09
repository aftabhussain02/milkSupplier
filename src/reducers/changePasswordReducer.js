import {
  UPDATE_CHANGE_PASSWORD_PROPS,
  CHANGE_PASSWORD_ATTEMPT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
} from '../actions/type';

const intState = {
  success: false,
  error: {},
  errorMessage: '',
  message: '',
  loading: false,
  current_password: '',
  password: '',
  confirm_password: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_CHANGE_PASSWORD_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case CHANGE_PASSWORD_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case CHANGE_PASSWORD_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
