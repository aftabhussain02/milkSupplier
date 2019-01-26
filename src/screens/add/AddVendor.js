import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { InputText, InputButton, SuccessModal, InputError, InputSelect } from '../../component';
import { updateAddVendorProps, addVendor, fetchvendorsList } from '../../actions';

class AddVendorProfile extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.product_id !== this.props.product_id) {
      this.resolveProductType();
    }
  }

  onSuccessPress() {
    this.props.fetchvendorsList();
    this.props.updateAddVendorProps('success', false);
  }

  resolveData(data) {
    const obj = { 0: 'Select product' };
    if (data && data.length > 0) {
      _.map(data, v => Object.assign(obj, { [v.id]: v.name }));
    }
    return obj;
  }

  resolveProductType() {
    const obj = { 0: 'Select product type' };
    const { products, product_id } = this.props;
    if (product_id && product_id != '0') {
      _.map(_.find(products, v => v.id == product_id).type, v =>
        Object.assign(obj, { [v.id]: v.name })
      );
    }
    return obj;
  }

  render() {
    const { containerStyle } = styles;
    const {
      success,
      error,
      errorMessage,
      message,
      loading,
      name,
      email,
      phone,
      product_id,
      product_type_id,
    } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Name"
            value={name}
            error={'name' in error}
            errorText={'name' in error && error.name[0]}
            onChangeText={value => this.props.updateAddVendorProps('name', value)}
          />
          <InputSelect
            label="Product"
            selectedValue={product_id && product_id.toString()}
            data={this.resolveData(this.props.products)}
            error={'product_id' in error}
            errorText={'product_id' in error && error.product_id[0]}
            onValueChange={value => this.props.updateAddVendorProps('product_id', value)}
          />
          <InputSelect
            label="Product Type"
            selectedValue={product_type_id && product_type_id.toString()}
            data={this.resolveProductType()}
            error={'product_type_id' in error}
            errorText={'product_type_id' in error && error.product_type_id[0]}
            onValueChange={value => this.props.updateAddVendorProps('product_type_id', value)}
          />
          <InputText
            label="Phone"
            value={phone}
            error={'phone' in error}
            errorText={'phone' in error && error.phone[0]}
            onChangeText={value => this.props.updateAddVendorProps('phone', value)}
          />
          <InputText
            label="Email"
            value={email}
            error={'email' in error}
            errorText={'email' in error && error.email[0]}
            onChangeText={value => this.props.updateAddVendorProps('email', value)}
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton
            title="Save Changes"
            onPress={() => this.props.addVendor(this.props)}
            loading={loading}
          />
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
  const {
    success,
    error,
    errorMessage,
    message,
    loading,
    name,
    email,
    phone,
    area,
    product_id,
    product_type_id,
    id,
  } = state.addVendor;
  const { data: products } = state.fetchProduct;
  return {
    success,
    error,
    errorMessage,
    message,
    loading,
    name,
    email,
    phone,
    area,
    product_id,
    product_type_id,
    id,
    products,
  };
};

export default connect(
  mapStateToProps,
  { addVendor, updateAddVendorProps, fetchvendorsList }
)(AddVendorProfile);
