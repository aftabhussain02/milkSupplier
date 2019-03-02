import { LIST_VENDORS, SELECTED_VENDOR, SEARCH_VENDORS } from '../actions/type';

const intState = {
  data: [],
  searchVendors: [],
  selectedVendor: {},
};

export default (state = intState, action) => {
  switch (action.type) {
    case LIST_VENDORS:
      return { ...state, data: action.payload, searchVendors: action.payload };
    case SEARCH_VENDORS:
      return { ...state, searchVendors: action.payload };
    case SELECTED_VENDOR:
      return { ...state, selectedVendor: action.payload };
    default:
      return state;
  }
};
