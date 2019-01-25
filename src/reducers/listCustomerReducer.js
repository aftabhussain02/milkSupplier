import { LIST_CUSTOMERS, SELECTED_CLIENT } from '../actions/type';

const intState = {
  data: [],
  selectedClient: {},
};

export default (state = intState, action) => {
  switch (action.type) {
    case LIST_CUSTOMERS:
      return { ...state, data: action.payload };
    case SELECTED_CLIENT:
      return { ...state, selectedClient: action.payload };
    default:
      return state;
  }
};
