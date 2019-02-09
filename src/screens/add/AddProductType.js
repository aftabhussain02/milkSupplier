import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { InputText, InputSelect, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateProductTypeProps,
  addProductType,
  fetchProductsList,
  validate,
  PRODUCT_TYPE_ERROR,
} from '../../actions';

class AddProductType extends Component {
  onSubmit() {
    const rule = {
      product_id: 'required',
      name: ['required', 'letters'],
    };
    this.props
      .validate(this.props, rule, PRODUCT_TYPE_ERROR)
      .then(() => this.props.addProductType(this.props));
  }

  onSuccessPress() {
    this.props.fetchProductsList();
    this.props.updateProductTypeProps('success', false);
    this.props.navigation.goBack();
  }

  resolveData(data) {
    const obj = { 0: 'Select product' };
    if (data && data.length > 0) {
      _.map(data, v => Object.assign(obj, { [v.id]: v.name }));
    }
    return obj;
  }

  render() {
    const { containerStyle } = styles;
    const { name, success, error, errorMessage, message, product_id, loading } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputSelect
            label="Product"
            selectedValue={product_id}
            data={this.resolveData(this.props.products)}
            error={'product_id' in error}
            errorText={'product_id' in error && error.product_id[0]}
            onValueChange={value => this.props.updateProductTypeProps('product_id', value)}
          />
          <InputText
            label="Product Type Name"
            value={name}
            error={'name' in error}
            errorText={'name' in error && error.name[0]}
            onChangeText={value => this.props.updateProductTypeProps('name', value)}
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton title="Add" onPress={() => this.onSubmit()} loading={loading} />
        </View>
        <SuccessModal visible={success} onPress={() => this.onSuccessPress()} text={message} />
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
  const { name, success, error, errorMessage, message, product_id, loading } = state.addProductType;
  const { data: products } = state.fetchProduct;
  return {
    success,
    error,
    errorMessage,
    message,
    product_id,
    name,
    loading,
    products,
  };
};

export default connect(
  mapStateToProps,
  { addProductType, updateProductTypeProps, fetchProductsList, validate }
)(AddProductType);
