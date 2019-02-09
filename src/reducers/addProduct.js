import {
  UPDATE_PRODUCT_PROPS,
  PRODUCT_ATTEMPT,
  PRODUCT_SUCCESS,
  PRODUCT_ERROR,
} from '../actions/type';

const intState = {
  success: false,
  error: {},
  errorMessage: '',
  message: '',
  loading: false,
  name: '',
  type: '',
  units: [],
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case PRODUCT_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case PRODUCT_ERROR:
      console.log(action.payload);
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case PRODUCT_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
