import React, { Component } from 'react';
import { ScrollView, View, TouchableWithoutFeedback, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  InputText,
  InputSelect,
  InputButton,
  SuccessModal,
  InputError,
  VendorHeader,
} from '../../component';
import {
  updateVendorProductEntryProps,
  addVendorProductEntry,
  fetchFilterVendorsList,
  validate,
  VENDOR_PRODUCT_ENTRY_ERROR,
} from '../../actions';

class AddVendorProductEntry extends Component {
  state = {
    success: false,
    openMore: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      manageMore: this.changeOpenMore.bind(this),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product_id !== this.props.product_id) {
      this.resolveProductType();
    }
  }

  changeOpenMore = () => {
    this.setState(prev => ({
      openMore: !prev.openMore,
    }));
  };

  resolveMore() {
    if (this.state.openMore) {
      return (
        <VendorHeader onPress={() => this.changeOpenMore()} navigation={this.props.navigation} />
      );
    }
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
  componentWillReceiveProps(nextProps) {
    const { fat, fat_rate, amount_qty, qty } = nextProps;
    if (
      fat !== this.props.fat ||
      fat_rate !== this.props.fat_rate ||
      amount_qty !== this.props.amount_qty ||
      qty !== this.props.qty
    ) {
      this.calculateTotalAmount(nextProps);
    }
  }
  calculateTotalAmount = (fat = 0, fat_rate = 0, amount_qty = 0, qty = 0) => {
    const fatTotal = parseInt(fat) * parseInt(fat_rate);
    const productTotal = parseInt(amount_qty) * parseInt(qty);
    const amount = parseInt(fatTotal) + parseInt(productTotal);
    this.props.updateVendorProductEntryProps('amount', amount && amount.toString());
  };
  onSuccessPress() {
    this.props.fetchFilterVendorsList();
    this.props.updateVendorProductEntryProps('success', false);
    this.props.navigation.navigate('listVendor');
  }

  onSubmit() {
    const rule = {
      qty: ['required', 'qty'],
      amount: ['required', 'amount'],
      product_id: 'required',
    };
    this.props
      .validate(this.props, rule, VENDOR_PRODUCT_ENTRY_ERROR)
      .then(() => this.props.addVendorProductEntry(this.props));
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
      id,
      loading,
      fat,
      fat_rate,
      amount_qty,
    } = this.props;
    return (
      <View style={containerStyle}>
        {this.resolveMore()}
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
            onChangeText={value => {
              this.props.updateVendorProductEntryProps('qty', value);
              this.calculateTotalAmount();
            }}
            keyboardType="numeric"
          />
          <InputText
            error={'amount_qty' in error}
            errorText={'amount_qty' in error && error.amount[0]}
            label="Amount per quantity"
            value={amount_qty}
            onChangeText={value => {
              this.props.updateVendorProductEntryProps('amount_qty', value);
              this.calculateTotalAmount();
            }}
            keyboardType="numeric"
          />

          <InputText
            error={'fat' in error}
            errorText={'fat' in error && error.fat[0]}
            label="Fat"
            value={fat}
            onChangeText={value => {
              this.props.updateVendorProductEntryProps('fat', value);
              this.calculateTotalAmount();
            }}
            keyboardType="numeric"
          />

          <InputText
            error={'fat_rate' in error}
            errorText={'fat_rate' in error && error.fat_rate[0]}
            label="Fate Rate"
            value={fat_rate}
            onChangeText={value => {
              this.props.updateVendorProductEntryProps('fat_rate', value);
              this.calculateTotalAmount();
            }}
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
        <View>
          <InputButton title="Add Product" onPress={() => this.onSubmit()} loading={loading} />
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
    qty,
    success,
    error,
    errorMessage,
    message,
    product_id,
    product_type_id,
    amount,
    remark,
    loading,
    fat,
    fat_rate,
    amount_qty,
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
    product_type_id,
    amount,
    remark,
    id,
    loading,
    products,
    fat,
    fat_rate,
    amount_qty,
  };
};

export default connect(
  mapStateToProps,
  { addVendorProductEntry, updateVendorProductEntryProps, fetchFilterVendorsList, validate }
)(AddVendorProductEntry);
