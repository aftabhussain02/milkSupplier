import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateEditCreditProps,
  editCredit,
  deleteCredit,
  EDIT_CREDIT_ERROR,
  validate,
  fetchCustomersList,
  fetchCredit,
} from '../../actions';

class EditCredit extends Component {
  state = {
    success: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      delete: this.delete.bind(this),
    });
  }

  onSuccessPress() {
    this.props.updateEditCreditProps('success', false);
    this.props.fetchCustomersList();
    this.props.fetchCredit();
    this.props.navigation.goBack();
  }

  onSubmit() {
    const rule = {
      amount: ['required', 'amount'],
    };
    this.props
      .validate(this.props, rule, EDIT_CREDIT_ERROR)
      .then(() => this.props.editCredit(this.props));
  }

  delete() {
    const { id } = this.props;
    this.props.deleteCredit(id);
  }

  render() {
    const { containerStyle } = styles;
    const { success, error, errorMessage, message, amount, loading } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            error={'amount' in error}
            errorText={'amount' in error && error.amount[0]}
            label="Amount"
            value={amount}
            onChangeText={value => this.props.updateEditCreditProps('amount', value)}
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
  const { success, error, errorMessage, message, amount, id, loading } = state.editCredit;

  return {
    success,
    error,
    errorMessage,
    message,
    amount,
    id,
    loading,
  };
};

export default connect(
  mapStateToProps,
  {
    editCredit,
    updateEditCreditProps,
    deleteCredit,
    validate,
    fetchCustomersList,
    fetchCredit,
  }
)(EditCredit);
