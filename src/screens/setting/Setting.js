import React, { Component } from 'react';
import { View } from 'react-native';
import { MenuList, MenuButton } from '../../component';

class Setting extends Component {
  render() {
    return (
      <View>
        <MenuList>
          <MenuButton
            title="Change Password"
            onPress={() => this.props.navigation.navigate('changePassword')}
            iconName="security"
          />
          <MenuButton
            title="All Transactions"
            onPress={() => this.props.navigation.navigate('transaction')}
            iconName="rupee"
            iconType="font-awesome"
          />
          <MenuButton
            title="All Notes"
            onPress={() => this.props.navigation.navigate('notes')}
            iconName="book"
            iconType="font-awesome"
          />
        </MenuList>
      </View>
    );
  }
}

export default Setting;
