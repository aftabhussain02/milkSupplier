import {
  UPDATE_ADD_VENDOR_PROPS,
  ADD_VENDOR_ATTEMPT,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_ERROR,
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
  alter_phone: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_ADD_VENDOR_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case ADD_VENDOR_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case ADD_VENDOR_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case ADD_VENDOR_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
