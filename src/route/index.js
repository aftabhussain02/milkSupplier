import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from '../screens/home/Home';
import AuthCheck from '../screens/auth/AuthCheck';
import Login from '../screens/auth/Login';
import { ACCENT_COLOR, logout } from '../constant';
import ListClients from '../screens/clients/ListClients';
import Setting from '../screens/setting/Setting';
import { MenuHeader, BackHeader } from '../component';
import AddProductEntry from '../screens/clients/AddProductEntry';
import ViewClientProfile from '../screens/clients/ViewClientProfile';
import EditClientProfile from '../screens/clients/EditClientProfile';
import ListVendors from '../screens/vendors/ListVendors';
import AddVendorProductEntry from '../screens/vendors/AddVendorProductEntry';
import ViewVendorProfile from '../screens/vendors/ViewVendorProfile';
import EditVendorProfile from '../screens/vendors/EditVendorProfile';
import AddScreen from '../screens/add/AddScreen';
import AddProduct from '../screens/add/AddProduct';
import AddClient from '../screens/add/AddClient';
import AddVendor from '../screens/add/AddVendor';
import AddCredit from '../screens/clients/AddCredit';
import AddDebit from '../screens/vendors/AddDebit';
import Sales from '../screens/clients/Sales';
import EditSales from '../screens/clients/EditSales';
import Purchases from '../screens/vendors/Purchases';
import EditPurchase from '../screens/vendors/EditPurchase';
import ChangePassword from '../screens/setting/ChangePassword';
import Transaction from '../screens/setting/Transaction';
import ClientNotes from '../screens/clients/ClientNotes';
import AddClientNote from '../screens/clients/AddClientNote';
import ViewClientNote from '../screens/clients/ViewClientNote';
import VendorNotes from '../screens/vendors/VendorNotes';
import AddVendorNote from '../screens/vendors/AddVendorNote';
import ViewVendorNote from '../screens/vendors/ViewVendorNote';
import EditDebit from '../screens/setting/EditDebit';
import EditCredit from '../screens/setting/EditCredit';
import ClientCredits from '../screens/clients/ClientCredits';
import EditClientCredit from '../screens/clients/EditClientCredit';
import VendorDebits from '../screens/vendors/VendorDebits';
import EditVendorDebit from '../screens/vendors/EditVendorDebit';
import Notes from '../screens/setting/Notes';

const Auth = createStackNavigator({
  login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
});

const HomeStack = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: <MenuHeader title="Home" disabledRightIcon />,
    }),
  },
});

const ClientsStack = createStackNavigator({
  listClient: {
    screen: ListClients,
    navigationOptions: ({ navigation }) => ({
      header: (
        <MenuHeader
          title="Clients"
          rightIconName="add"
          onRightIconPress={() => navigation.navigate('addClient')}
        />
      ),
    }),
  },
  addProductEntry: {
    screen: AddProductEntry,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Sales entry" navigation={navigation} disableRightIcon />,
    }),
  },
  clientProfile: {
    screen: ViewClientProfile,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Client Profile"
          navigation={navigation}
          onRightIconPress={() => navigation.navigate('editClientProfile')}
        />
      ),
    }),
  },
  editClientProfile: {
    screen: EditClientProfile,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Edit Profile" navigation={navigation} disableRightIcon />,
    }),
  },
  addCredit: {
    screen: AddCredit,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Credit" navigation={navigation} disableRightIcon />,
    }),
  },
  addClient: {
    screen: AddClient,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Client" navigation={navigation} disableRightIcon />,
    }),
  },
  clientNotes: {
    screen: ClientNotes,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Notes"
          navigation={navigation}
          rightIconName="add"
          onRightIconPress={() => navigation.navigate('addClientNote')}
        />
      ),
    }),
  },
  addClientNote: {
    screen: AddClientNote,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Note" navigation={navigation} disableRightIcon />,
    }),
  },
  viewClientNote: {
    screen: ViewClientNote,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Note" navigation={navigation} disableRightIcon />,
    }),
  },
  sales: {
    screen: Sales,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Sales Entries" navigation={navigation} disableRightIcon />,
    }),
  },
  editSales: {
    screen: EditSales,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Edit Entry"
          navigation={navigation}
          rightIconName="remove"
          onRightIconPress={() => navigation.state.params.delete()}
        />
      ),
    }),
  },
  clientCredits: {
    screen: ClientCredits,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Transactions" navigation={navigation} disableRightIcon />,
    }),
  },
  editClientCredits: {
    screen: EditClientCredit,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Edit Transactions"
          navigation={navigation}
          rightIconName="remove"
          onRightIconPress={() => navigation.state.params.delete()}
        />
      ),
    }),
  },
});

const AddStack = createStackNavigator({
  addScreen: {
    screen: AddScreen,
    navigationOptions: ({ navigation }) => ({
      header: <MenuHeader title="Add" disabledRightIcon />,
    }),
  },
  addProduct: {
    screen: AddProduct,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Product" navigation={navigation} disableRightIcon />,
    }),
  },
});

const VendorStack = createStackNavigator({
  listVendor: {
    screen: ListVendors,
    navigationOptions: ({ navigation }) => ({
      header: (
        <MenuHeader
          title="Vendors"
          rightIconName="add"
          onRightIconPress={() => navigation.navigate('addVendor')}
        />
      ),
    }),
  },
  addVendorProductEntry: {
    screen: AddVendorProductEntry,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Add Purchase Entry"
          navigation={navigation}
          rightIconName="more-vert"
          disableRightIcon
        />
      ),
    }),
  },
  vendorProfile: {
    screen: ViewVendorProfile,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Vendor Profile"
          navigation={navigation}
          onRightIconPress={() => navigation.navigate('editVendorProfile')}
        />
      ),
    }),
  },
  editVendorProfile: {
    screen: EditVendorProfile,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Edit Profile" navigation={navigation} disableRightIcon />,
    }),
  },
  addDebit: {
    screen: AddDebit,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Debit" navigation={navigation} disableRightIcon />,
    }),
  },
  addVendor: {
    screen: AddVendor,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Vendor" navigation={navigation} disableRightIcon />,
    }),
  },
  purchases: {
    screen: Purchases,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Purchases Entries" navigation={navigation} disableRightIcon />,
    }),
  },
  editPurchases: {
    screen: EditPurchase,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Edit Entry"
          navigation={navigation}
          rightIconName="remove"
          onRightIconPress={() => navigation.state.params.delete()}
        />
      ),
    }),
  },
  vendorNotes: {
    screen: VendorNotes,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Notes"
          navigation={navigation}
          rightIconName="add"
          onRightIconPress={() => navigation.navigate('addVendorNote')}
        />
      ),
    }),
  },
  addVendorNote: {
    screen: AddVendorNote,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Note" navigation={navigation} disableRightIcon />,
    }),
  },
  viewVendorNote: {
    screen: ViewVendorNote,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Note" navigation={navigation} disableRightIcon />,
    }),
  },
  vendorDebits: {
    screen: VendorDebits,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Transactions" navigation={navigation} disableRightIcon />,
    }),
  },
  editVendorDebits: {
    screen: EditVendorDebit,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Edit Transactions"
          navigation={navigation}
          rightIconName="remove"
          onRightIconPress={() => navigation.state.params.delete()}
        />
      ),
    }),
  },
});

const SettingStack = createStackNavigator({
  setting: {
    screen: Setting,
    navigationOptions: ({ navigation }) => ({
      header: (
        <MenuHeader
          title="Setting"
          onRightIconPress={() => {
            logout().then(() => navigation.navigate('AuthCheck'));
          }}
        />
      ),
    }),
  },
  changePassword: {
    screen: ChangePassword,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Change Password" navigation={navigation} disableRightIcon />,
    }),
  },
  transaction: {
    screen: Transaction,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Transactions" navigation={navigation} disableRightIcon />,
    }),
  },
  editDebit: {
    screen: EditDebit,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Edit Transaction"
          navigation={navigation}
          rightIconName="remove"
          onRightIconPress={() => navigation.state.params.delete()}
        />
      ),
    }),
  },
  editCredit: {
    screen: EditCredit,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Edit Transaction"
          navigation={navigation}
          rightIconName="remove"
          onRightIconPress={() => navigation.state.params.delete()}
        />
      ),
    }),
  },
  notes: {
    screen: Notes,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Notes" navigation={navigation} disableRightIcon />,
    }),
  },
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

ClientsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

AddStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

VendorStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

SettingStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const App = createAppContainer(
  createBottomTabNavigator(
    {
      Home: HomeStack,
      Clients: ClientsStack,
      Add: AddStack,
      Vendor: VendorStack,
      Setting: SettingStack,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        swipeEnabled: true,
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;

          if (routeName === 'Home') {
            iconName = 'home';
          } else if (routeName === 'Clients') {
            iconName = 'account-circle';
          } else if (routeName === 'Add') {
            return (
              <Icon
                name="plus"
                type="font-awesome"
                size={24}
                color="#F8F8F8"
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2,
                  backgroundColor: ACCENT_COLOR,
                }}
              />
            );
          } else if (routeName === 'Vendor') {
            iconName = 'group';
          } else if (routeName === 'Setting') {
            iconName = 'build';
          }
          return <Icon name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: ACCENT_COLOR,
        inactiveTintColor: 'gray',
        showLabel: false,
      },
    }
  )
);

export default createSwitchNavigator(
  {
    Auth,
    AuthCheck,
    App,
  },
  {
    initialRouteName: 'AuthCheck',
  }
);
