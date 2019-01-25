import React, { Component } from 'react';
import { View, SectionList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SectionTitle, SectionListItem } from '../../component';
import { initializeEditVendor, fetchVendorsList, selectedVendor } from '../../actions';

class ListVendors extends Component {
  componentDidMount() {
    this.props.fetchVendorsList();
  }

  resolveData() {
    const { data } = this.props;
    const obj = [];
    if (data && Object.keys(data).length > 0) {
      _.map(data, (v, i) => {
        obj.push({
          title: i,
          data: v,
        });
      });
    }
    return obj;
  }

  resolveList() {
    return (
      <SectionList
        renderItem={({ item, index, section }) => (
          <SectionListItem
            key={index}
            {...item}
            onPress={() => {
              this.props.selectedVendor(item);
              this.props.initializeEditVendor(item);
              this.props.navigation.navigate('AddProductEntry');
            }}
          />
        )}
        renderSectionHeader={({ section: { title } }) => <SectionTitle title={title} />}
        sections={this.resolveData()}
        keyExtractor={(item, index) => item + index}
      />
    );
  }

  render() {
    return <View>{this.resolveList()}</View>;
  }
}

const mapStateToProps = state => {
  const { data } = state.listCustomer;
  return { data };
};

export default connect(
  mapStateToProps,
  { fetchVendorsList, selectedVendor, initializeEditVendor }
)(ListVendors);