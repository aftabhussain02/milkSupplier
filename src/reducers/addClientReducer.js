import {
  UPDATE_ADD_CLIENT_PROPS,
  ADD_CLIENT_ATTEMPT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR,
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
    case UPDATE_ADD_CLIENT_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case ADD_CLIENT_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case ADD_CLIENT_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case ADD_CLIENT_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
