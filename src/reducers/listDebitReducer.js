import { DEBIT_LIST } from '../actions/type';

const intState = {
  data: [],
};

export default (state = intState, action) => {
  switch (action.type) {
    case DEBIT_LIST:
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
