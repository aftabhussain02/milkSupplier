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
      </View>
    );
  }
}

const styles = {
  container: {},
};

export default AddScreen;
