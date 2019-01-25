import {
  UPDATE_EDIT_CLIENT_PROFILE_PROPS,
  EDIT_CLIENT_PROFILE_ATTEMPT,
  EDIT_CLIENT_PROFILE_SUCCESS,
  EDIT_CLIENT_PROFILE_ERROR,
  INITIALIZE_EDIT_CLIENT,
} from '../actions/type';

const intState = {
  success: false,
  error: {},
  errorMessage: '',
  message: '',
  loading: false,
  name: '',
  email: '',
  phone: '',
  area: '',
  id: 0,
};

export default (state = intState, action) => {
  switch (action.type) {
    case INITIALIZE_EDIT_CLIENT:
      return { ...state, ...action.payload };

    case UPDATE_EDIT_CLIENT_PROFILE_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case EDIT_CLIENT_PROFILE_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case EDIT_CLIENT_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case EDIT_CLIENT_PROFILE_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
