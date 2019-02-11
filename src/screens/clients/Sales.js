import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ProductList, ProductListItem } from '../../component';
import { initializeEditProductEntry } from '../../actions';

class Sales extends Component {
  onPress(data) {
    this.props.initializeEditProductEntry({
      ...data,
      product_id: data.product.id,
    });

    this.props.navigation.navigate('editSales');
  }

  resolveList() {
    if (this.props.data && this.props.data.length > 0) {
      return _.map(this.props.data, v => {
        const { user, product, amount } = v;
        return (
          <ProductList>
            <ProductListItem
              title={user.name}
              product={product.full_name}
              amount={amount}
              onPress={() => this.onPress(v)}
            />
          </ProductList>
        );
      });
    }
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Empty Sales.</Text>;
  }

  render() {
    const { container, textContainer, titleStyle, amountStyle, productStyle } = styles;
    return (
      <View>
        <View style={container}>
          <View style={textContainer}>
            <Text style={titleStyle}>Title</Text>
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
    width: '40%',
    fontWeight: 'bold',
    fontSize: 12,
  },
  amountStyle: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  },
  productStyle: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  },
};

const mapStateToProps = state => {
  const { data } = state.listClientProductEntry;
  return { data };
};

export default connect(
  mapStateToProps,
  { initializeEditProductEntry }
)(Sales);
