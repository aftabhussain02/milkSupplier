import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

class VendorNotes extends Component {
  resolveNote() {
    const { note } = this.props;
    if (note && Object.keys(note).length > 0) {
      return _.map(note, v => (
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('viewVendorNote', { note })}
        >
          <View
            style={{
              borderRadius: 6,
              elevation: 2,
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}
          >
            <Text style={{ padding: 15 }}>{v.note}</Text>
          </View>
        </TouchableNativeFeedback>
      ));
    }
  }
  render() {
    return <View>{this.resolveNote()}</View>;
  }
}

const mapStateToProps = state => {
  const { note } = state.listVendor.selectedVendor;
  console.log(state);
  return { note };
};

export default connect(mapStateToProps)(VendorNotes);
