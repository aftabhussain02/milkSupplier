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
        </MenuList>
      </View>
    );
  }
}

export default Setting;
