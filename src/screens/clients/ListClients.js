import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SectionListItem, CustomModel, ActionSheetButton } from '../../component';
import { initializeEditClient, selectedClient } from '../../actions';

class ListClients extends Component {
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
            onPress={() => this.routeInit(item, 'addProductEntry')}
            title="Add Sales"
          />
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'clientProfile')}
            title="View Client Profile"
          />
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'addCredit')}
            title="Add Receive Money"
          />
        </View>
      </CustomModel>
    );
  }

  routeInit(item, name) {
    this.setState({
      actionSheetVisible: false,
    });
    this.props.selectedClient(item);
    this.props.initializeEditClient(item);
    this.props.navigation.navigate(name);
  }

  resolveList() {
    const { data } = this.props;
    if (data && Object.keys(data).length > 0) {
      return _.map(this.props.data, (item, index) => (
        <SectionListItem
          key={index}
          item={item}
          onPress={() => {
            this.props.selectedClient(item);
            this.props.initializeEditClient(item);
            this.props.navigation.navigate('clientProfile');
          }}
          onPressMore={d => this.resolveActionSheet(d)}
        />
      ));
    }
  }
  render() {
    return (
      <View>
        {this.resolveList()}
        {this.actionSheet()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.listCustomer;
  return { data };
};

export default connect(
  mapStateToProps,
  { selectedClient, initializeEditClient }
)(ListClients);
