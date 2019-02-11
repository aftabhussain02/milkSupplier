import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import _ from 'lodash';

class ViewClientNote extends Component {
  resolveNote() {
    const { note } = this.props.navigation.state.params;
    if (note) {
      return <Text>{note}</Text>;
    }
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ScrollView>{this.resolveNote()}</ScrollView>
      </View>
    );
  }
}

export default ViewClientNote;
