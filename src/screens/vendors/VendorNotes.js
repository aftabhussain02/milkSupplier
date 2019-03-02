import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ACCENT_COLOR } from '../../constant';

class VendorNotes extends Component {
  resolveNote() {
    const { note } = this.props;
    if (note && Object.keys(note).length > 0) {
      return _.map(note, v => (
        <View
          style={{
            borderRadius: 6,
            elevation: 2,
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
            borderLeftColor: ACCENT_COLOR,
            borderLeftWidth: 2,
          }}
        >
          <Text style={{ padding: 15 }}>{v.note}</Text>
        </View>
      ));
    }
  }
  render() {
    return <View>{this.resolveNote()}</View>;
  }
}

const mapStateToProps = state => {
  const { note } = state.listVendor.selectedVendor;
  return { note };
};

export default connect(mapStateToProps)(VendorNotes);
