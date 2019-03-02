import { LIST_NOTES } from '../actions';

const intState = {};

export default (state = intState, action) => {
  switch (action.type) {
    case LIST_NOTES:
      return action.payload;

    default:
      return state;
  }
};
