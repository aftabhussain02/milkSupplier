import React, { Component } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  InputText,
  InputSelect,
  InputButton,
  SuccessModal,
  InputError,
  ClientHeader,
} from '../../component';
import {
  updateProductEntryProps,
  addProductEntry,
  fetchProductsList,
  fetchFilterClientsList,
  validate,
  PRODUCT_ENTRY_ERROR,
} from '../../actions';

class AddProductEntry extends Component {
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
  componentWillUnmount() {
    this.setState({
      openMore: false,
    });
  }

  changeOpenMore = () => {
    this.setState(prev => ({
      openMore: !prev.openMore,
    }));
  };

  resolveMore() {
    if (this.state.openMore) {
      return (
        <ClientHeader onPress={() => this.changeOpenMore()} navigation={this.props.navigation} />
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

  onSuccessPress() {
    this.props.fetchFilterClientsList();
    this.props.updateProductEntryProps('success', false);
    this.props.navigation.navigate('listClient');
  }

  onSubmit() {
    const rule = {
      qty: ['required', 'qty'],
      product_id: 'required',
      amount: ['required', 'amount'],
    };
    this.props
      .validate(this.props, rule, PRODUCT_ENTRY_ERROR)
      .then(() => this.props.addProductEntry(this.props));
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
      <TouchableWithoutFeedback
        onPressIn={() =>
          this.setState({
            openMore: false,
          })
        }
      >
        <View style={containerStyle}>
          {this.resolveMore()}
          <ScrollView>
            <InputSelect
              label="Product"
              selectedValue={product_id}
              data={this.resolveData(this.props.products)}
              error={'product_id' in error}
              errorText={'product_id' in error && error.product_id[0]}
              onValueChange={value => this.props.updateProductEntryProps('product_id', value)}
            />
            <InputSelect
              label="Product Type"
              selectedValue={product_type_id}
              data={this.resolveProductType()}
              error={'product_type_id' in error}
              errorText={'product_type_id' in error && error.product_type_id[0]}
              onValueChange={value => this.props.updateProductEntryProps('product_type_id', value)}
            />
            <InputText
              label="Qty"
              value={qty}
              error={'qty' in error}
              errorText={'qty' in error && error.qty[0]}
              onChangeText={value => this.props.updateProductEntryProps('qty', value)}
              keyboardType="numeric"
            />
            <InputText
              error={'amount' in error}
              errorText={'amount' in error && error.amount[0]}
              label="Amount"
              value={amount}
              onChangeText={value => this.props.updateProductEntryProps('amount', value)}
              keyboardType="numeric"
            />
            <InputText
              error={'remark' in error}
              errorText={'remark' in error && error.remark[0]}
              label="Remark"
              value={remark}
              multiline
              numberOfLines={10}
              onChangeText={value => this.props.updateProductEntryProps('remark', value)}
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
      </TouchableWithoutFeedback>
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
  } = state.productEntry;
  const { id } = state.listCustomer.selectedClient;
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
  { addProductEntry, updateProductEntryProps, fetchProductsList, fetchFilterClientsList, validate }
)(AddProductEntry);
