import { FETCH_DASHBOARD } from '../actions/type';

const intState = {
  data: {
    totals: {
      totalSales: 0,
      totalPurchases: 0,
    },
  },
};

export default (state = intState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
