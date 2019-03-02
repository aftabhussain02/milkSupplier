import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, Linking, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { ProfileView, ProfileViewItem } from '../../component';
import { SUCCESS_COLOR, FAILURE_COLOR } from '../../constant';

class ViewClientProfile extends Component {
  numberComponent(phone) {
    if (phone) {
      return (
        <TouchableNativeFeedback onPress={() => Linking.openURL(`tel:+91-${phone}`)}>
          <Text style={{ color: 'blue', padding: 15 }}>+91-{phone}</Text>
        </TouchableNativeFeedback>
      );
    }
    return <Text style={{ padding: 15 }}>-</Text>;
  }

  resolveLastEntry() {
    const { last } = this.props.selectedClient;
    if (last && Object.keys(last).length > 0) {
      return (
        <ProfileView style={{ paddingBottom: 20 }}>
          <ProfileViewItem
            heading={`Last Entry (${moment(last.entry_date).format('DD-MM-YYYY')})`}
          />
          <ProfileViewItem title="Product" value={_.upperFirst(last.product.name)} />
          <ProfileViewItem title="Amount" value={last.amount} />
          <ProfileViewItem title="Qty" value={last.qty} />
          <ProfileViewItem title="Unit" value={last.unit_type} />
        </ProfileView>
      );
    }
  }
  render() {
    const { name, area, phone, email, alter_phone, last, payment } = this.props.selectedClient;
    const { footerContainer, footerTextStyle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <ProfileView>
            <ProfileViewItem heading="Personal Detail" />
            <ProfileViewItem title="Name" value={name} />
            <ProfileViewItem title="Area" value={area} />
            <ProfileViewItem title="Phone" valueComponent={this.numberComponent(phone)} />
            <ProfileViewItem
              title="Alternate Number"
              valueComponent={this.numberComponent(alter_phone)}
            />
            <ProfileViewItem title="Email" value={email || '-'} />
          </ProfileView>
          {this.resolveLastEntry()}
        </ScrollView>
        <View
          style={[
            footerContainer,
            payment.toString().includes('-') && {
              backgroundColor: FAILURE_COLOR,
            },
          ]}
        >
          <Text style={[footerTextStyle, { fontWeight: 'bold' }]}>Amount</Text>
          <Text style={footerTextStyle}>₹{payment}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footerContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: SUCCESS_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  footerTextStyle: {
    padding: 10,
    color: '#fff',
    fontSize: 18,
  },
};

const mapStateToProps = state => {
  const { selectedClient } = state.listCustomer;

  return { selectedClient };
};

export default connect(mapStateToProps)(ViewClientProfile);
