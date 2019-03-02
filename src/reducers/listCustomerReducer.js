import { LIST_CUSTOMERS, SELECTED_CLIENT, SEARCH_CUSTOMERS } from '../actions/type';

const intState = {
  data: [],
  searchCustomers: [],
  selectedClient: {},
};

export default (state = intState, action) => {
  switch (action.type) {
    case LIST_CUSTOMERS:
      return { ...state, data: action.payload, searchCustomers: action.payload };
    case SEARCH_CUSTOMERS:
      return { ...state, searchCustomers: action.payload };
    case SELECTED_CLIENT:
      return { ...state, selectedClient: action.payload };
    default:
      return state;
  }
};
