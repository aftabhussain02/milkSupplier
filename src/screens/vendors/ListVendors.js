import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SectionListItem, CustomModel, ActionSheetButton } from '../../component';
import { initializeEditVendor, fetchvendorsList, selectedVendor } from '../../actions';

class ListVendors extends Component {
  state = {
    actionSheetVisible: false,
    phone: '',
    alter_phone: '',
    item: {},
  };

  resolveActionSheet = item => {
    this.setState({
      actionSheetVisible: true,
      item,
    });
  };

  actionSheet() {
    const { item } = this.state;
    return (
      <CustomModel
        visible={this.state.actionSheetVisible}
        onPressOut={() =>
          this.setState({
            actionSheetVisible: false,
          })
        }
      >
        <View style={{ width: '90%' }}>
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'addVendorProductEntry')}
            title="Add Purchase"
          />
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'vendorProfile')}
            title="View Vendor Profile"
          />
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'addDebit')}
            title="Add Send Money"
          />
          <ActionSheetButton onPress={() => this.routeInit(item, 'vendorNotes')} title="Notes" />
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'purchases')}
            title="All Purchases"
          />
        </View>
      </CustomModel>
    );
  }

  routeInit(item, name) {
    this.setState({
      actionSheetVisible: false,
    });
    this.props.selectedVendor(item);
    this.props.initializeEditVendor(item);
    this.props.navigation.navigate(name);
  }

  resolveList() {
    const { data } = this.props;
    if (data && Object.keys(data).length > 0) {
      return _.map(this.props.data, (item, index) => (
        <SectionListItem
          key={index}
          amountInMinus
          item={item}
          productName={item.vendor_product_name}
          onPress={() => {
            this.props.selectedVendor(item);
            this.props.initializeEditVendor(item);
            this.props.navigation.navigate('vendorProfile');
          }}
          onPressMore={d => this.resolveActionSheet(d)}
        />
      ));
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={{ marginBottom: 20 }}>{this.resolveList()}</View>
        {this.actionSheet()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.listVendor;
  return { data };
};

export default connect(
  mapStateToProps,
  { fetchvendorsList, selectedVendor, initializeEditVendor }
)(ListVendors);
