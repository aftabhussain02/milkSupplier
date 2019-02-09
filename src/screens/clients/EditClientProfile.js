import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateEditClientProps,
  editClient,
  fetchCustomersList,
  EDIT_CLIENT_PROFILE_ERROR,
  validate,
} from '../../actions';

class EditClientProfile extends Component {
  onSuccessPress() {
    this.props.fetchCustomersList();
    this.props.updateEditClientProps('success', false);
    this.props.navigation.navigate('listClient');
  }

  onPress() {
    const rules = {
      name: ['required', 'letters'],
      phone: ['required', 'phone'],
      area: 'required',
      alter_phone: ['nullable', 'phone'],
    };
    this.props
      .validate(this.props, rules, EDIT_CLIENT_PROFILE_ERROR)
      .then(() => this.props.editClient(this.props));
  }

  render() {
    const { containerStyle } = styles;
    const {
      success,
      error,
      errorMessage,
      message,
      loading,
      name,
      email,
      phone,
      area,
      alter_phone,
    } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Name"
            value={name}
            error={'name' in error}
            errorText={'name' in error && error.name[0]}
            onChangeText={value => this.props.updateEditClientProps('name', value)}
          />
          <InputText
            label="Area"
            value={area}
            error={'area' in error}
            errorText={'area' in error && error.area[0]}
            onChangeText={value => this.props.updateEditClientProps('area', value)}
          />
          <InputText
            label="Phone"
            value={phone}
            error={'phone' in error}
            errorText={'phone' in error && error.phone[0]}
            onChangeText={value => this.props.updateEditClientProps('phone', value)}
          />
          <InputText
            label="Alternate Number"
            value={alter_phone}
            error={'alter_phone' in error}
            errorText={'alter_phone' in error && error.alter_phone[0]}
            onChangeText={value => this.props.updateEditClientProps('alter_phone', value)}
          />
          <InputText
            label="Email"
            value={email}
            error={'email' in error}
            errorText={'email' in error && error.email[0]}
            onChangeText={value => this.props.updateEditClientProps('email', value)}
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton title="Save Changes" onPress={() => this.onPress()} loading={loading} />
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
    name,
    email,
    phone,
    area,
    id,
    alter_phone,
  } = state.editClient;
  return {
    success,
    error,
    errorMessage,
    message,
    loading,
    name,
    email,
    phone,
    area,
    id,
    alter_phone,
  };
};

export default connect(
  mapStateToProps,
  { editClient, updateEditClientProps, fetchCustomersList, validate }
)(EditClientProfile);
