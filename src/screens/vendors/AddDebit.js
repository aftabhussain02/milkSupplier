import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateAddDebitProps,
  addDebit,
  validate,
  ADD_DEBIT_ERROR,
  fetchvendorsList,
  fetchDebit,
} from '../../actions';

class AddDebit extends Component {
  onSubmit() {
    this.props
      .validate(this.props, { amount: ['required', 'amount'] }, ADD_DEBIT_ERROR)
      .then(() => this.props.addDebit(this.props));
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
            onChangeText={value => this.props.updateAddDebitProps('amount', value)}
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
            this.props.updateAddDebitProps('success', false);
            this.props.fetchvendorsList();
            this.props.fetchDebit();
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
  const { amount, success, error, errorMessage, message, loading } = state.addDebit;

  const { id } = state.listVendor.selectedVendor;

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
  { addDebit, updateAddDebitProps, validate, fetchvendorsList, fetchDebit }
)(AddDebit);
