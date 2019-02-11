import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { InputText, InputSelect, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateEditVendorProductEntryProps,
  editVendorProductEntry,
  deleteVendorProductEntry,
  fetchFilterVendorsList,
  validate,
  EDIT_VENDOR_PRODUCT_ENTRY_ERROR,
} from '../../actions';

class EditVendorProductEntry extends Component {
  state = {
    success: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      delete: this.delete.bind(this),
    });
  }

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

  delete() {
    const { id } = this.props;
    this.props.deleteVendorProductEntry(id);
  }

  resolveData(data) {
    const obj = { 0: 'Select product' };
    if (data && data.length > 0) {
      _.map(data, v => Object.assign(obj, { [v.id]: v.full_name }));
    }
    return obj;
  }

  onSuccessPress() {
    this.props.updateEditVendorProductEntryProps('success', false);
    this.props.fetchFilterVendorsList();
    this.props.navigation.goBack();
  }

  calculateTotalAmount = ({ fat = 0, fat_rate = 0, qty_amount = 0, qty = 0 }) => {
    const fatTotal = parseInt(fat) * parseInt(fat_rate);
    const productTotal = parseInt(qty_amount) * parseInt(qty);
    const amount = fatTotal ? parseInt(fatTotal) + parseInt(productTotal) : parseInt(productTotal);
    this.props.updateEditVendorProductEntryProps('amount', amount && amount.toString());
  };

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
      .validate(this.props, rule, EDIT_VENDOR_PRODUCT_ENTRY_ERROR)
      .then(() => this.props.editVendorProductEntry(this.props));
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
      qty_amount,
      fat,
      fat_rate,
    } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputSelect
            label="Product"
            selectedValue={product_id && product_id.toString()}
            data={this.resolveData(this.props.products)}
            error={'product_id' in error}
            errorText={'product_id' in error && error.product_id[0]}
            onValueChange={value =>
              this.props.updateEditVendorProductEntryProps('product_id', value)
            }
          />
          <InputText
            label="Quantity"
            value={qty.toString()}
            error={'qty' in error}
            errorText={'qty' in error && error.qty[0]}
            onChangeText={value => this.props.updateEditVendorProductEntryProps('qty', value)}
            keyboardType="numeric"
          />
          <InputText
            error={'qty_amount' in error}
            errorText={'qty_amount' in error && error.qty_amount[0]}
            label="Amount per quantity"
            value={qty_amount}
            onChangeText={value => this.props.updateEditVendorProductEntryProps('qty_amount', value)}
            keyboardType="numeric"
          />

          <InputText
            error={'fat' in error}
            errorText={'fat' in error && error.fat[0]}
            label="Fat"
            value={fat}
            onChangeText={value => this.props.updateEditVendorProductEntryProps('fat', value)}
            keyboardType="numeric"
          />

          <InputText
            error={'fat_rate' in error}
            errorText={'fat_rate' in error && error.fat_rate[0]}
            label="Fate Rate"
            value={fat_rate}
            onChangeText={value => this.props.updateEditVendorProductEntryProps('fat_rate', value)}
            keyboardType="numeric"
          />

          <InputText
            error={'remark' in error}
            errorText={'remark' in error && error.remark[0]}
            label="Remark"
            value={remark}
            onChangeText={value => this.props.updateEditVendorProductEntryProps('remark', value)}
          />
          <InputText
            error={'amount' in error}
            errorText={'amount' in error && error.amount[0]}
            label="Amount"
            value={amount}
            onChangeText={value => this.props.updateEditVendorProductEntryProps('amount', value)}
            keyboardType="numeric"
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
    id,
    qty_amount,
    fat,
    fat_rate,
  } = state.editVendorProductEntry;
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
    qty_amount,
    fat,
    fat_rate,
  };
};

export default connect(
  mapStateToProps,
  {
    editVendorProductEntry,
    updateEditVendorProductEntryProps,
    deleteVendorProductEntry,
    fetchFilterVendorsList,
    validate,
  }
)(EditVendorProductEntry);
