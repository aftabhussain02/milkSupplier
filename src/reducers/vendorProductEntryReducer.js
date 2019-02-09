import {
  UPDATE_VENDOR_PRODUCT_ENTRY_PROPS,
  VENDOR_PRODUCT_ENTRY_ATTEMPT,
  VENDOR_PRODUCT_ENTRY_SUCCESS,
  VENDOR_PRODUCT_ENTRY_ERROR,
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
  amount_qty: '',
  fat: '',
  fat_rate: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_VENDOR_PRODUCT_ENTRY_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case VENDOR_PRODUCT_ENTRY_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case VENDOR_PRODUCT_ENTRY_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case VENDOR_PRODUCT_ENTRY_SUCCESS:
      return { ...intState, success: true, message: action.payload.message };

    default:
      return state;
  }
};
