import React, { Component } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { SearchBar } from 'react-native-elements';
import {
  SectionListItem,
  CustomModel,
  ActionSheetButton,
  LoadingIndicator,
  ErrorModal,
} from '../../component';
import {
  initializeEditClient,
  selectedClient,
  generatePdf,
  fetchCustomersList,
  searchClient,
} from '../../actions';
import { invoiceApi, ACCENT_COLOR } from '../../constant';

class ListClients extends Component {
  state = {
    actionSheetVisible: false,
    phone: '',
    alter_phone: '',
    item: {},
    error: '',
    loading: false,
  };

  resolveActionSheet = item => {
    this.setState({
      actionSheetVisible: true,
      item,
    });
  };

  generateBill(id) {
    this.setState({
      loading: true,
      actionSheetVisible: false,
    });
    this.props
      .generatePdf(id)
      .then(s => {
        console.log(s);
        this.setState({
          loading: false,
        });
        this.props.fetchCustomersList();
        Linking.openURL(invoiceApi + s.uid);
      })
      .catch(e => {
        console.log(e);
        this.setState({
          error: e.message,
          loading: false,
        });
      });
  }

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
        <View style={{ width: widthPercentageToDP('80%') }}>
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
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'clientCredits')}
            title="View Transactions"
          />
          <ActionSheetButton onPress={() => this.routeInit(item, 'clientNotes')} title="Notes" />
          <ActionSheetButton onPress={() => this.routeInit(item, 'sales')} title="All Sales" />
          <ActionSheetButton onPress={() => this.generateBill(item.id)} title="Generate Bill" />
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
    const { searchCustomers: data } = this.props;
    if (data && Object.keys(data).length > 0) {
      return _.map(data, (item, index) => (
        <SectionListItem
          key={index}
          item={item}
          onPress={() => {
            this.props.selectedClient(item);
            this.props.initializeEditClient(item);
            this.props.navigation.navigate('clientProfile');
          }}
          onPressMore={d => this.resolveActionSheet(d)}
          delay={500 + index * 100}
        />
      ));
    }
  }

  render() {
    const { error, loading } = this.state;
    return loading ? (
      <LoadingIndicator />
    ) : (
      <View>
        <SearchBar
          lightTheme
          icon={{ type: 'font-awesome', name: 'search' }}
          onChangeText={value => this.props.searchClient(this.props.data, value)}
          placeholder="Type Here..."
          style={{ borderTopWidth: 0 }}
          containerStyle={{ backgroundColor: ACCENT_COLOR, borderTopWidth: 0 }}
        />
        <ScrollView>
          <View style={{ marginBottom: 20 }}>{this.resolveList()}</View>
          {this.actionSheet()}
          <ErrorModal
            visible={error !== ''}
            text={error}
            onPress={() => this.setState({ error: '' })}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { data, searchCustomers } = state.listCustomer;
  return { data, searchCustomers };
};

export default connect(
  mapStateToProps,
  { selectedClient, initializeEditClient, generatePdf, fetchCustomersList, searchClient }
)(ListClients);
