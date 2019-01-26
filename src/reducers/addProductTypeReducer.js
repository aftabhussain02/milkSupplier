import {
  UPDATE_PRODUCT_TYPE_PROPS,
  PRODUCT_TYPE_ATTEMPT,
  PRODUCT_TYPE_SUCCESS,
  PRODUCT_TYPE_ERROR,
} from '../actions/type';

const intState = {
  success: false,
  error: {},
  errorMessage: '',
  message: '',
  loading: false,
  name: '',
  product_id: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_TYPE_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case PRODUCT_TYPE_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case PRODUCT_TYPE_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case PRODUCT_TYPE_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
