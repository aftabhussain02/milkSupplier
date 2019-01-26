import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
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
import { updateVendorProductEntryProps, addVendorProductEntry } from '../../actions';

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
      return <VendorHeader navigation={this.props.navigation} />;
    }
  }

  resolveData(data) {
    const obj = { 0: 'Select product' };
    console.log(data);
    if (data && data.length > 0) {
      _.map(data, v => Object.assign(obj, { [v.id]: v.name }));
    }
    console.log(obj);
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
    } = this.props;
    return (
      <View style={containerStyle}>
        {this.resolveMore()}
        <ScrollView>
          <InputText
            label="Qty"
            value={qty}
            error={'qty' in error}
            errorText={'qty' in error && error.qty[0]}
            onChangeText={value => this.props.updateVendorProductEntryProps('qty', value)}
          />
          <InputSelect
            label="Product"
            selectedValue={product_id}
            data={this.resolveData(this.props.products)}
            error={'product_id' in error}
            errorText={'product_id' in error && error.product_id[0]}
            onValueChange={value => this.props.updateVendorProductEntryProps('product_id', value)}
          />
          <InputSelect
            label="Product Type"
            selectedValue={product_type_id}
            data={this.resolveProductType()}
            error={'product_type_id' in error}
            errorText={'product_type_id' in error && error.product_type_id[0]}
            onValueChange={value =>
              this.props.updateVendorProductEntryProps('product_type_id', value)
            }
          />
          <InputText
            error={'amount' in error}
            errorText={'amount' in error && error.amount[0]}
            label="Amount"
            value={amount}
            onChangeText={value => this.props.updateVendorProductEntryProps('amount', value)}
          />
          <InputText
            error={'remark' in error}
            errorText={'remark' in error && error.remark[0]}
            label="Remark"
            value={remark}
            onChangeText={value => this.props.updateVendorProductEntryProps('remark', value)}
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
              this.props.addVendorProductEntry({
                product_id,
                product_type_id,
                amount,
                qty,
                remark,
                user_id: id,
              })
            }
            loading={loading}
          />
        </View>
        <SuccessModal
          visible={success}
          onPress={() => {
            this.props.updateVendorProductEntryProps('success', false);
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
  };
};

export default connect(
  mapStateToProps,
  { addVendorProductEntry, updateVendorProductEntryProps }
)(AddVendorProductEntry);
