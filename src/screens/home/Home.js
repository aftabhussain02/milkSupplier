import React, { Component } from 'react';
import { View } from 'react-native';
import { MenuList, MenuButton } from '../../component';

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <MenuList>
          <MenuButton
            title="Sells"
            onPress={() => this.props.navigation.navigate('Clients')}
            iconName="account-circle"
          />
          <MenuButton
            title="Purchases"
            onPress={() => this.props.navigation.navigate('Vendor')}
            iconName="group"
          />
          <MenuButton
            title="Collect Money"
            onPress={() => this.props.navigation.navigate('Vendor')}
            iconName="add"
          />
          <MenuButton
            iconName="remove"
            title="Pay Money"
            onPress={() => this.props.navigation.navigate('Vendor')}
          />
        </MenuList>
      </View>
    );
  }
}

export default HomeScreen;
