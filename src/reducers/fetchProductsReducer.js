import { FETCH_PRODUCTS } from '../actions/type';

const intState = {
  data: [],
};

export default (state = intState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
