import { FETCH_PRODUCTS } from '../actions/type';

const intState = {
  data: [],
};

export default (state = intState, action) => {
  console.log(action.type);
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('inside');
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
