import { LIST_VENDORS, SELECTED_VENDOR } from '../actions/type';

const intState = {
  data: [],
  selectedClient: {},
};

export default (state = intState, action) => {
  switch (action.type) {
    case LIST_VENDORS:
      return { ...state, data: action.payload };
    case SELECTED_VENDOR:
      return { ...state, selectedClient: action.payload };
    default:
      return state;
  }
};
