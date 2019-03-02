import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { ACCENT_COLOR } from '../../constant';
import Debit from './Debit';
import Credit from './Credit';

export default class Transaction extends Component {
  state = {
    index: 0,
    routes: [{ key: 'credit', title: 'Credit' }, { key: 'debit', title: 'Debit' }],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'debit':
              return <Debit {...this.props} />;
            case 'credit':
              return <Credit {...this.props} />;
            default:
              return null;
          }
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#fff' }}
            style={{ backgroundColor: ACCENT_COLOR }}
          />
        )}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
