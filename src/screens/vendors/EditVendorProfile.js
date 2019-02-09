import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { InputText, InputButton, SuccessModal, InputError, InputSelect } from '../../component';
import {
  updateEditVendorProps,
  editVendor,
  fetchvendorsList,
  validate,
  EDIT_VENDOR_PROFILE_ERROR,
} from '../../actions';

class EditVendorProfile extends Component {
  onSuccessPress() {
    this.props.fetchvendorsList();
    this.props.updateEditVendorProps('success', false);
    this.props.navigation.navigate('listVendor');
  }

  onSubmit() {
    const rule = {
      name: ['required', 'letters'],
      phone: ['required', 'phone'],
      product_id: 'required',
      alter_phone: ['nullable', 'phone'],
    };
    this.props
      .validate(this.props, rule, EDIT_VENDOR_PROFILE_ERROR)
      .then(() => this.props.editVendor(this.props));
  }

  resolveData(data) {
    const obj = { 0: 'Select product' };
    if (data && data.length > 0) {
      _.map(data, v => Object.assign(obj, { [v.id]: v.full_name }));
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
      alter_phone,
    } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Name"
            value={name}
            error={'name' in error}
            errorText={'name' in error && error.name[0]}
            onChangeText={value => this.props.updateEditVendorProps('name', value)}
          />
          <InputSelect
            label="Product"
            selectedValue={product_id && product_id.toString()}
            data={this.resolveData(this.props.products)}
            error={'product_id' in error}
            errorText={'product_id' in error && error.product_id[0]}
            onValueChange={value => this.props.updateEditVendorProps('product_id', value)}
          />
          <InputText
            label="Phone"
            value={phone}
            error={'phone' in error}
            errorText={'phone' in error && error.phone[0]}
            onChangeText={value => this.props.updateEditVendorProps('phone', value)}
            keyboardType="numeric"
          />
          <InputText
            label="Alternate Number"
            value={alter_phone}
            error={'alter_phone' in error}
            errorText={'alter_phone' in error && error.alter_phone[0]}
            onChangeText={value => this.props.updateEditVendorProps('alter_phone', value)}
            keyboardType="numeric"
          />
          <InputText
            label="Email"
            value={email}
            error={'email' in error}
            errorText={'email' in error && error.email[0]}
            onChangeText={value => this.props.updateEditVendorProps('email', value)}
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton title="Save Changes" onPress={() => this.onSubmit()} loading={loading} />
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
    alter_phone,
  } = state.editVendor;
  console.log(state.editVendor);
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
    alter_phone,
  };
};

export default connect(
  mapStateToProps,
  { editVendor, updateEditVendorProps, fetchvendorsList, validate }
)(EditVendorProfile);
