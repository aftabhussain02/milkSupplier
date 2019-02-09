import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateChangePasswordProps,
  validate,
  CHANGE_PASSWORD_ERROR,
  changePassword,
} from '../../actions';

class ChangePassword extends Component {
  onSubmit() {
    const rule = {
      confirm_password: 'required',
      current_password: 'required',
      password: 'required',
    };
    this.props
      .validate(this.props, rule, CHANGE_PASSWORD_ERROR)
      .then(() => this.props.changePassword(this.props));
  }

  onSuccessPress() {
    this.props.updateChangePasswordProps('success', false);
    this.props.navigation.goBack();
  }

  render() {
    const { containerStyle } = styles;
    const {
      success,
      error,
      errorMessage,
      message,
      loading,
      current_password,
      password,
      confirm_password,
    } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Current Password"
            value={current_password}
            error={'current_password' in error}
            errorText={'current_password' in error && error.current_password[0]}
            onChangeText={value => this.props.updateChangePasswordProps('current_password', value)}
            secureTextEntry
          />
          <InputText
            label="Password"
            value={password}
            error={'password' in error}
            errorText={'password' in error && error.password[0]}
            onChangeText={value => this.props.updateChangePasswordProps('password', value)}
            secureTextEntry
          />
          <InputText
            label="Confirm Password"
            value={confirm_password}
            error={'confirm_password' in error}
            errorText={'confirm_password' in error && error.confirm_password[0]}
            onChangeText={value => this.props.updateChangePasswordProps('confirm_password', value)}
            secureTextEntry
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
    success,
    error,
    errorMessage,
    message,
    loading,
    password,
    current_password,
    confirm_password,
  } = state.changePassword;
  return {
    success,
    error,
    errorMessage,
    message,
    loading,
    password,
    current_password,
    confirm_password,
  };
};

export default connect(
  mapStateToProps,
  { validate, updateChangePasswordProps, changePassword }
)(ChangePassword);
