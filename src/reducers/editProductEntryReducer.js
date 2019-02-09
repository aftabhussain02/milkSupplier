import {
  UPDATE_EDIT_PRODUCT_ENTRY_PROPS,
  EDIT_PRODUCT_ENTRY_ATTEMPT,
  EDIT_PRODUCT_ENTRY_SUCCESS,
  EDIT_PRODUCT_ENTRY_ERROR,
  INITIALIZE_EDIT_PRODUCT_ENTRY,
} from '../actions/type';

const intState = {
  qty: '',
  product_id: '',
  product_type_id: '',
  amount: '',
  remark: '',
  error: {},
  success: false,
  loading: false,
  errorMessage: '',
  message: '',
  id: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case INITIALIZE_EDIT_PRODUCT_ENTRY:
      return { ...state, ...action.payload };
    case UPDATE_EDIT_PRODUCT_ENTRY_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case EDIT_PRODUCT_ENTRY_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case EDIT_PRODUCT_ENTRY_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case EDIT_PRODUCT_ENTRY_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
