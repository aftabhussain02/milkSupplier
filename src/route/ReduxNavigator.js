
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
  } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import Navigation from '../route';


export const navReducer = createNavigationReducer(Navigation);

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
export const navMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
  );
  
  const App = reduxifyNavigator(Navigation, 'root');
  const mapStateToProps = (state) => ({
    state: state.nav,
  });

  export default connect(mapStateToProps)(App);
