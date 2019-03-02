import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { ProductList, ProductListItem } from '../../component';
import { initializeEditCredit } from '../../actions';

class ClientCredits extends Component {
  onPress(credits) {
    this.props.initializeEditCredit({
      ...credits,
    });

    this.props.navigation.navigate('editClientCredits');
  }

  resolveList() {
    if (this.props.credits && this.props.credits.length > 0) {
      return (
        <ProductList>
          {_.map(this.props.credits, (v, index) => {
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
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Empty Credit.</Text>;
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
  const { credits, name } = state.listCustomer.selectedClient;
  return { credits, name };
};

export default connect(
  mapStateToProps,
  { initializeEditCredit }
)(ClientCredits);
