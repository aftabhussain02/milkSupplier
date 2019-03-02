import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Axios from 'axios';
import { connect } from 'react-redux';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import { getStorageParams, noteApi } from '../../constant';
import { fetchvendorsList } from '../../actions';

class AddVendorNote extends Component {
  state = {
    note: '',
    error: {},
    errorMessage: '',
    loading: false,
    message: '',
    success: false,
  };

  onSuccessPress() {
    this.props.fetchvendorsList();
    this.props.navigation.navigate('listVendor');
    this.updateProductProps('success', false);
  }

  onSubmit() {
    const { note } = this.state;
    const { id: user_id } = this.props;
    if (!note) {
      const error = { note: ['Note cant be empty.'] };
      this.setState({
        error,
      });
    }
    this.setState({
      error: {},
      errorMessage: '',
      loading: true,
    });
    getStorageParams().then(({ headers }) =>
      Axios.post(noteApi, { note, user_id }, { headers })
        .then(({ data }) =>
          this.setState({
            note: '',
            loading: false,
            success: true,
            message: data.message,
          })
        )
        .catch(e => console.log(e.response.data))
    );
  }

  updateProductProps(prop, value) {
    this.setState({
      [prop]: value,
    });
  }

  render() {
    const { containerStyle } = styles;
    const { note, error, errorMessage, loading, message, success } = this.state;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Note"
            value={note}
            error={'note' in error}
            errorText={'note' in error && error.note[0]}
            onChangeText={value => this.updateProductProps('note', value)}
            multiline
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton title="Add" onPress={() => this.onSubmit()} loading={loading} />
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
  const { id } = state.listVendor.selectedVendor;

  return { id };
};

export default connect(
  mapStateToProps,
  { fetchvendorsList }
)(AddVendorNote);
