import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import ReduxNavigator, { navMiddleware } from './src/route/ReduxNavigator';
import reducers from './src/reducers';

console.disableYellowBox = true;
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, navMiddleware));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ReduxNavigator />
      </Provider>
    );
  }
}
