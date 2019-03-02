import React, { Component } from 'react';
import { TouchableNativeFeedback, Linking, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { ProfileView, ProfileViewItem } from '../../component';
import { SUCCESS_COLOR, FAILURE_COLOR } from '../../constant';

class ViewVendorProfile extends Component {
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
    const { last } = this.props.selectedVendor;
    if (last && Object.keys(last).length > 0) {
      return (
        <ProfileView style={{ paddingBottom: 20 }} delay={500}>
          <ProfileViewItem
            heading={`Last Entry (${moment(last.entry_date).format('DD-MM-YYYY')})`}
          />
          <ProfileViewItem title="Product" value={_.upperFirst(last.product.name)} />
          <ProfileViewItem title="Qty" value={last.qty} />
          <ProfileViewItem title="Qty amount" value={last.qty_amount} />
          <ProfileViewItem title="Fat" value={last.fat} />
          <ProfileViewItem title="Fat Rate" value={last.fat_rate} />
          <ProfileViewItem title="Amount" value={last.amount} />
        </ProfileView>
      );
    }
  }
  render() {
    const {
      name,
      phone,
      email,
      vendor_product_name,
      alter_phone,
      payment,
    } = this.props.selectedVendor;
    const { footerContainer, footerTextStyle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <ScrollView>
          <ProfileView>
            <ProfileViewItem
              heading="Personal Detail"
              columnContainer={{ borderTopWidth: 1, borderBottomWidth: 1 }}
            />
            <ProfileViewItem title="Name" value={name} columnContainer={{ borderTopWidth: 1 }} />
            <ProfileViewItem title="Product" value={vendor_product_name} />
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
              backgroundColor: SUCCESS_COLOR,
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
    backgroundColor: FAILURE_COLOR,
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
  const { selectedVendor } = state.listVendor;

  return { selectedVendor };
};

export default connect(mapStateToProps)(ViewVendorProfile);
