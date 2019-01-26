import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { InputButton } from '../../component';

class AddScreen extends Component {
  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <InputButton
          containerViewStyle={{ width: '90%', marginTop: 20 }}
          title="Add Product"
          onPress={() => this.props.navigation.navigate('addProduct')}
        />
        <InputButton
          containerViewStyle={{ width: '90%', marginTop: 20 }}
          title="Add Product Type"
          onPress={() => this.props.navigation.navigate('addProductType')}
        />
        <InputButton
          containerViewStyle={{ width: '90%', marginTop: 20 }}
          title="Add Client"
          onPress={() => this.props.navigation.navigate('addClient')}
        />
        <InputButton
          containerViewStyle={{ width: '90%', marginTop: 20 }}
          title="Add Vendor"
          onPress={() => this.props.navigation.navigate('addVendor')}
        />
      </View>
    );
  }
}

const styles = {
  container: {},
};

export default AddScreen;
