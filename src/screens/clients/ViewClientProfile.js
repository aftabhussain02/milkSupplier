import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { ProfileView, ProfileViewItem } from '../../component';
import { ACCENT_COLOR } from '../../constant';

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
        <View>
          <ProfileViewItem
            heading={`Last Entry (${moment(last.entry_date).format('DD-MM-YYYY')})`}
          />
          <ProfileViewItem title={_.upperFirst(last.product.name)} value={`₹${last.amount}`} />
        </View>
      );
    }
  }
  render() {
    const { name, area, phone, email, alter_phone, last } = this.props.selectedClient;
    const { footerContainer, footerTextStyle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <ProfileView>
          <ProfileViewItem
            heading="Personal Detail"
            columnContainer={{ borderTopWidth: 1, borderBottomWidth: 1 }}
          />
          <ProfileViewItem title="Name" value={name} columnContainer={{ borderTopWidth: 1 }} />
          <ProfileViewItem title="Area" value={area} />
          <ProfileViewItem title="Phone" valueComponent={this.numberComponent(phone)} />
          <ProfileViewItem
            title="Alternate Number"
            valueComponent={this.numberComponent(alter_phone)}
          />
          <ProfileViewItem title="Email" value={email || '-'} />
          {this.resolveLastEntry()}
        </ProfileView>
        <View style={footerContainer}>
          <Text style={[footerTextStyle, { fontWeight: 'bold' }]}>Amount</Text>
          <Text style={footerTextStyle}>₹2000</Text>
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
    backgroundColor: ACCENT_COLOR,
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
