import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ProductList, ProductListItem } from '../../component';
import { initializeEditVendorProductEntry } from '../../actions';
import { ACCENT_COLOR } from '../../constant';

class Purchases extends Component {
  onPress(data) {
    this.props.initializeEditVendorProductEntry({
      id: data.id,
      product_id: data.product.id,
      amount: data.amount,
      qty: data.qty.toString(),
      remark: data.remark,
      product_type_id: data.product_type && data.product_type.id,
    });

    this.props.navigation.navigate('editPurchases');
  }

  resolveList() {
    if (this.props.data && this.props.data.length > 0) {
      return _.map(this.props.data, v => {
        const { user, product, amount } = v;
        return (
          <ProductList>
            <ProductListItem
              title={user.name}
              product={product.name}
              amount={amount}
              onPress={() => this.onPress(v)}
            />
          </ProductList>
        );
      });
    }
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Empty Purchases.</Text>;
  }

  render() {
    const { container, textContainer, titleStyle, amountStyle, productStyle } = styles;

    return (
      <View>
        <View style={container}>
          <View style={textContainer}>
            <Text style={titleStyle}>Name</Text>
            <Text style={productStyle}>Product</Text>
            <Text style={amountStyle}>Amount</Text>
          </View>
        </View>
        {this.resolveList()}
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: -10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DB1A24',
    padding: 10,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  titleStyle: {
    width: '60%',
    fontWeight: 'bold',
    fontSize: 12,
  },
  amountStyle: {
    width: '20%',
    fontWeight: 'bold',
    fontSize: 12,
  },
  productStyle: {
    width: '20%',
    fontWeight: 'bold',
    fontSize: 12,
  },
};

const mapStateToProps = state => {
  const { data } = state.listVendorProductEntry;
  return { data };
};

export default connect(
  mapStateToProps,
  { initializeEditVendorProductEntry }
)(Purchases);
