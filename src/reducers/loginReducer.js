import { UPDATE_LOGIN_PROPS, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/type';

const intState = {
  email: 'test@test.com',
  password: 'test@12',
  error: {},
  success: false,
  loading: false,
  errorMessage: '',
};

export default (state = intState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_PROPS:
      return { ...state, [action.payload.prop]: action.payload.value };

    case LOGIN_ATTEMPT:
      return { ...state, error: {}, loading: true, errorMessage: '' };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.data || {},
        errorMessage: action.payload.message,
        loading: false,
      };

    case LOGIN_SUCCESS:
      return { ...intState, success: true };

    default:
      return state;
  }
};
