import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getStorageParams } from '../../constant/storage';
import {
  fetchProductsList,
  fetchCustomersList,
  fetchvendorsList,
  fetchFilterClientsList,
  fetchFilterVendorsList,
} from '../../actions';

class AuthCheck extends Component {
  async componentDidMount() {
    try {
      getStorageParams()
        .then(u => {
          if (u.token) {
            try {
              this.props.fetchFilterClientsList();
              this.props.fetchFilterVendorsList();
              this.props.fetchProductsList();
              this.props.fetchCustomersList();
              this.props.fetchvendorsList();
            } finally {
              this.props.navigation.navigate('App');
            }
            return;
          }
          this.props.navigation.navigate('Auth');
          return;
        })
        .catch(() => this.props.navigation.navigate('Auth'));
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0095E6" />
      </View>
    );
  }
}

export default connect(
  null,
  {
    fetchProductsList,
    fetchCustomersList,
    fetchvendorsList,
    fetchFilterClientsList,
    fetchFilterVendorsList,
  }
)(AuthCheck);
