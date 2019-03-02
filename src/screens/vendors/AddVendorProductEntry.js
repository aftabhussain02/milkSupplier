import React, { Component } from 'react';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { InputText, InputSelect, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateVendorProductEntryProps,
  addVendorProductEntry,
  fetchFilterVendorsList,
  validate,
  VENDOR_PRODUCT_ENTRY_ERROR,
  fetchvendorsList,
  fetchDashboard,
} from '../../actions';

class AddVendorProductEntry extends Component {
  state = {
    success: false,
  };

  componentWillReceiveProps(nextProps) {
    const { fat, fat_rate, qty_amount, qty } = nextProps;
    if (
      fat !== this.props.fat ||
      fat_rate !== this.props.fat_rate ||
      qty_amount !== this.props.qty_amount ||
      qty !== this.props.qty
    ) {
      this.calculateTotalAmount(nextProps);
    }
  }

  onSuccessPress() {
    this.props.fetchDashboard();
    this.props.fetchvendorsList();
    this.props.fetchFilterVendorsList();
    this.props.updateVendorProductEntryProps('success', false);
    this.props.navigation.navigate('listVendor');
  }

  onSubmit() {
    const rule = {
      qty: ['required', 'qty'],
      amount: ['required', 'amount'],
      product_id: 'required',
      fat: ['qty'],
      fat_rate: ['qty'],
      qty_amount: ['qty'],
    };
    this.props
      .validate(this.props, rule, VENDOR_PRODUCT_ENTRY_ERROR)
      .then(() => this.props.addVendorProductEntry(this.props));
  }

  calculateTotalAmount = ({ fat = 0, fat_rate = 0, qty_amount = 0, qty = 0 }) => {
    const fatTotal = parseInt(fat) * parseInt(fat_rate);
    const productTotal = parseInt(qty_amount) * parseInt(qty);
    const amount = fatTotal ? parseInt(fatTotal) + parseInt(productTotal) : parseInt(productTotal);
    this.props.updateVendorProductEntryProps('amount', amount && amount.toString());
  };

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
      qty,
      success,
      error,
      errorMessage,
      message,
      product_id,
      amount,
      remark,
      loading,
      fat,
      fat_rate,
      qty_amount,
    } = this.props;
    return (
      <View style={containerStyle}>
        <KeyboardAvoidingView keyboardVerticalOffset={80} enabled behavior="padding">
          <ScrollView>
            <InputSelect
              label="Product"
              selectedValue={product_id}
              data={this.resolveData(this.props.products)}
              error={'product_id' in error}
              errorText={'product_id' in error && error.product_id[0]}
              onValueChange={value => this.props.updateVendorProductEntryProps('product_id', value)}
            />
            <InputText
              label="Quantity"
              value={qty}
              error={'qty' in error}
              errorText={'qty' in error && error.qty[0]}
              onChangeText={value => this.props.updateVendorProductEntryProps('qty', value)}
              keyboardType="numeric"
            />
            <InputText
              error={'qty_amount' in error}
              errorText={'qty_amount' in error && error.qty_amount[0]}
              label="Amount per quantity"
              value={qty_amount}
              onChangeText={value => this.props.updateVendorProductEntryProps('qty_amount', value)}
              keyboardType="numeric"
            />

            <InputText
              error={'fat' in error}
              errorText={'fat' in error && error.fat[0]}
              label="Fat"
              value={fat}
              onChangeText={value => this.props.updateVendorProductEntryProps('fat', value)}
              keyboardType="numeric"
            />

            <InputText
              error={'fat_rate' in error}
              errorText={'fat_rate' in error && error.fat_rate[0]}
              label="Fate Rate"
              value={fat_rate}
              onChangeText={value => this.props.updateVendorProductEntryProps('fat_rate', value)}
              keyboardType="numeric"
            />

            <InputText
              error={'remark' in error}
              errorText={'remark' in error && error.remark[0]}
              label="Remark"
              value={remark}
              onChangeText={value => this.props.updateVendorProductEntryProps('remark', value)}
            />
            <InputText
              error={'amount' in error}
              errorText={'amount' in error && error.amount[0]}
              label="Amount"
              value={amount}
              onChangeText={value => this.props.updateVendorProductEntryProps('amount', value)}
              keyboardType="numeric"
            />
            <InputError
              visible={Object.keys(error) < 1 && errorMessage}
              errorText={errorMessage && errorMessage}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={{ paddingBottom: 30 }}>
          <InputButton
            title={amount ? `Add Purchase of (₹${amount})` : 'Add Purchase'}
            onPress={() => this.onSubmit()}
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
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = state => {
  const {
    qty,
    success,
    error,
    errorMessage,
    message,
    product_id,
    unit_type,
    amount,
    remark,
    loading,
    fat,
    fat_rate,
    qty_amount,
  } = state.vendorProductEntry;
  const { id } = state.listVendor.selectedVendor;
  const { data: products } = state.fetchProduct;

  return {
    qty,
    success,
    error,
    errorMessage,
    message,
    product_id,
    unit_type,
    amount,
    remark,
    id,
    loading,
    products,
    fat,
    fat_rate,
    qty_amount,
  };
};

export default connect(
  mapStateToProps,
  {
    addVendorProductEntry,
    updateVendorProductEntryProps,
    fetchFilterVendorsList,
    validate,
    fetchvendorsList,
    fetchDashboard,
  }
)(AddVendorProductEntry);
