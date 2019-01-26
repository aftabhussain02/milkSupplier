import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import { updateProductProps, addProduct } from '../../actions';

class AddProduct extends Component {
  render() {
    const { containerStyle } = styles;
    const { name, success, error, errorMessage, message, loading } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Name"
            value={name}
            error={'name' in error}
            errorText={'name' in error && error.name[0]}
            onChangeText={value => this.props.updateProductProps('name', value)}
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton
            title="Add Product"
            onPress={() =>
              this.props.addProduct({
                name,
              })
            }
            loading={loading}
          />
        </View>
        <SuccessModal
          visible={success}
          onPress={() => {
            this.props.updateProductProps('success', false);
          }}
          text={message}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = state => {
  const { name, success, error, errorMessage, message, loading } = state.addProduct;

  return {
    name,
    success,
    error,
    errorMessage,
    message,
    loading,
  };
};

export default connect(
  mapStateToProps,
  { addProduct, updateProductProps }
)(AddProduct);
