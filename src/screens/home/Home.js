import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { MenuList, MenuButton } from '../../component';

class HomeScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    );
  }

  onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  render() {
    return (
      <View>
        <MenuList>
          <MenuButton
            title="Sales"
            onPress={() => this.props.navigation.navigate('sales')}
            iconName="account-circle"
          />
          <MenuButton
            title="Purchases"
            onPress={() => this.props.navigation.navigate('purchases')}
            iconName="group"
          />
          {/* <MenuButton
            title="Collect Money"
            onPress={() => this.props.navigation.navigate('Vendor')}
            iconName="add"
          />
          <MenuButton
            iconName="remove"
            title="Pay Money"
            onPress={() => this.props.navigation.navigate('Vendor')}
         />*/}
        </MenuList>
      </View>
    );
  }
}

export default HomeScreen;
