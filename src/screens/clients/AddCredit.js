import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateAddCreditProps,
  addCredit,
  validate,
  ADD_CREDIT_ERROR,
  fetchCustomersList,
  fetchCredit,
} from '../../actions';

class AddCredit extends Component {
  onSubmit() {
    const rule = {
      amount: ['required', 'amount'],
    };
    this.props
      .validate(this.props, rule, ADD_CREDIT_ERROR)
      .then(() => this.props.addCredit(this.props));
  }
  render() {
    const { containerStyle } = styles;
    const { amount, success, error, errorMessage, message, loading } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Amount"
            value={amount}
            error={'amount' in error}
            errorText={'amount' in error && error.amount[0]}
            onChangeText={value => this.props.updateAddCreditProps('amount', value)}
            keyboardType="numeric"
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton title="Add" onPress={() => this.onSubmit()} loading={loading} />
        </View>
        <SuccessModal
          visible={success}
          onPress={() => {
            this.props.updateAddCreditProps('success', false);
            this.props.fetchCustomersList();
            this.props.fetchCredit();
            this.props.navigation.goBack();
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
  const { amount, success, error, errorMessage, message, loading } = state.addCredit;

  const { id } = state.listCustomer.selectedClient;

  return {
    amount,
    success,
    error,
    errorMessage,
    message,
    loading,
    id,
  };
};

export default connect(
  mapStateToProps,
  { addCredit, updateAddCreditProps, validate, fetchCustomersList, fetchCredit }
)(AddCredit);
