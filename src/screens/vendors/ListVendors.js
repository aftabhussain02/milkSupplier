import React, { Component } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { SearchBar } from 'react-native-elements';
import { invoiceApi, ACCENT_COLOR } from '../../constant';
import {
  SectionListItem,
  CustomModel,
  ActionSheetButton,
  ErrorModal,
  LoadingIndicator,
} from '../../component';
import {
  initializeEditVendor,
  fetchvendorsList,
  selectedVendor,
  generatePdf,
  searchVendor,
} from '../../actions';

class ListVendors extends Component {
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
        this.props.fetchvendorsList();
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
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'vendorDebits')}
            title="View Transactions"
          />
          <ActionSheetButton onPress={() => this.routeInit(item, 'vendorNotes')} title="Notes" />
          <ActionSheetButton
            onPress={() => this.routeInit(item, 'purchases')}
            title="All Purchases"
          />
          <ActionSheetButton onPress={() => this.generateBill(item.id)} title="Generate Bill" />
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
    const { searchVendors: data } = this.props;
    if (data && Object.keys(data).length > 0) {
      return _.map(data, (item, index) => (
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
      <ScrollView>
        <SearchBar
          lightTheme
          icon={{ type: 'font-awesome', name: 'search' }}
          onChangeText={value => this.props.searchVendor(this.props.data, value)}
          placeholder="Type Here..."
          style={{ borderTopWidth: 0 }}
          containerStyle={{ backgroundColor: ACCENT_COLOR, borderTopWidth: 0 }}
        />
        <View style={{ marginBottom: 20 }}>{this.resolveList()}</View>
        {this.actionSheet()}
        <ErrorModal
          visible={error !== ''}
          text={error}
          onPress={() => this.setState({ error: '' })}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { data, searchVendors } = state.listVendor;
  return { data, searchVendors };
};

export default connect(
  mapStateToProps,
  { fetchvendorsList, selectedVendor, initializeEditVendor, generatePdf, searchVendor }
)(ListVendors);
