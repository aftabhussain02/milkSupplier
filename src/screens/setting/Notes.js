import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { ACCENT_COLOR } from '../../constant';
import { deleteNote, fetchNotesList, fetchCustomersList, fetchvendorsList } from '../../actions';

class Notes extends Component {
  resolveNote() {
    const { notes } = this.props;
    if (notes && Object.keys(notes).length > 0) {
      return _.map(notes, v => (
        <View
          style={{
            borderRadius: 6,
            elevation: 2,
            width: '90%',
            alignSelf: 'center',
            marginBottom: 10,
            borderLeftColor: ACCENT_COLOR,
            borderLeftWidth: 2,
            overflow: 'hidden',
            flexDirection: 'row',
            height: 'auto',
          }}
        >
          <Text style={{ padding: 15, width: '90%' }}>{v.note}</Text>
          <Icon
            name="remove"
            containerStyle={{ backgroundColor: 'red', width: '10%' }}
            color="#fff"
            onPress={() =>
              this.props.deleteNote(v.id).then(() => {
                this.props.fetchNotesList();
                this.props.fetchCustomersList();
                this.props.fetchvendorsList();
              })
            }
          />
        </View>
      ));
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ paddingTop: 20 }}>{this.resolveNote()}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { notes } = state;
  return { notes };
};

export default connect(
  mapStateToProps,
  { deleteNote, fetchCustomersList, fetchNotesList, fetchvendorsList }
)(Notes);
