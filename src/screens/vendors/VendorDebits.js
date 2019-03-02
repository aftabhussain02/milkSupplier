import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { ProductList, ProductListItem } from '../../component';
import { initializeEditDebit } from '../../actions';

class VendorDebits extends Component {
  onPress(debits) {
    this.props.initializeEditDebit({
      ...debits,
    });

    this.props.navigation.navigate('editVendorDebits');
  }

  resolveList() {
    if (this.props.debits && this.props.debits.length > 0) {
      return (
        <ProductList>
          {_.map(this.props.debits, (v, index) => {
            const { created_at, amount } = v;
            return (
              <ProductListItem
                title={this.props.name}
                product={moment(created_at).format('DD-MM-YYYY hh:mm A')}
                amount={amount}
                onPress={() => this.onPress(v)}
                delay={500 + index * 100}
              />
            );
          })}
        </ProductList>
      );
    }
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Empty Debit.</Text>;
  }

  render() {
    const { container, textContainer, titleStyle, amountStyle, productStyle } = styles;

    return (
      <View>
        <View style={container}>
          <View style={textContainer}>
            <Text style={titleStyle}>Name</Text>
            <Text style={productStyle}>Date</Text>
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
    textAlign: 'center',
  },
  productStyle: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
};

const mapStateToProps = state => {
  const { debits, name } = state.listVendor.selectedVendor;
  return { debits, name };
};

export default connect(
  mapStateToProps,
  { initializeEditDebit }
)(VendorDebits);
