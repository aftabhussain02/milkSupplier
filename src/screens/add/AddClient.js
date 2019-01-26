import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import { updateAddClientProps, addClient, fetchCustomersList } from '../../actions';

class AddClientProfile extends Component {
  onSuccessPress() {
    this.props.fetchCustomersList();
    this.props.updateAddClientProps('success', false);
  }

  render() {
    const { containerStyle } = styles;
    const { success, error, errorMessage, message, loading, name, email, phone, area } = this.props;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Name"
            value={name}
            error={'name' in error}
            errorText={'name' in error && error.name[0]}
            onChangeText={value => this.props.updateAddClientProps('name', value)}
          />
          <InputText
            label="Area"
            value={area}
            error={'area' in error}
            errorText={'area' in error && error.area[0]}
            onChangeText={value => this.props.updateAddClientProps('area', value)}
          />
          <InputText
            label="Phone"
            value={phone}
            error={'phone' in error}
            errorText={'phone' in error && error.phone[0]}
            onChangeText={value => this.props.updateAddClientProps('phone', value)}
          />
          <InputText
            label="Email"
            value={email}
            error={'email' in error}
            errorText={'email' in error && error.email[0]}
            onChangeText={value => this.props.updateAddClientProps('email', value)}
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton
            title="Save Changes"
            onPress={() => this.props.addClient(this.props)}
            loading={loading}
          />
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
  } = state.addClient;
  console.log(state.addClient);
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
  };
};

export default connect(
  mapStateToProps,
  { addClient, updateAddClientProps, fetchCustomersList }
)(AddClientProfile);
