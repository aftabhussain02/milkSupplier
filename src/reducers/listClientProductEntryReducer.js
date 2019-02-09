import { LIST_CLIENT_PRODUCT_ENTRIES } from '../actions/type';

const intState = {
  data: [],
};

export default (state = intState, action) => {
  switch (action.type) {
    case LIST_CLIENT_PRODUCT_ENTRIES:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
