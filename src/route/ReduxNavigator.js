import React, { PureComponent } from 'react';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Navigation from '../route';

export const navReducer = createNavigationReducer(Navigation);

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
export const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const ReduxAppNavigator = reduxifyNavigator(Navigation, 'root');

class ReduxNavigator extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch } = this.props;

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, state } = this.props;
    return <ReduxAppNavigator dispatch={dispatch} state={state} />;
  }
}

const mapStateToProps = state => ({
  state: state.nav,
});

export default connect(mapStateToProps)(ReduxNavigator);
