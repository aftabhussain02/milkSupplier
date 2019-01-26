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
import { ACCENT_COLOR } from '../constant';
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
import AddProductType from '../screens/add/AddProductType';
import AddClient from '../screens/add/AddClient';
import AddVendor from '../screens/add/AddVendor';

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
      header: <MenuHeader title="Clients" disabledRightIcon />,
    }),
  },
  addProductEntry: {
    screen: AddProductEntry,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Add Product Entry"
          rightIconName="more-vert"
          navigation={navigation}
          onRightIconPress={() => navigation.state.params.manageMore()}
        />
      ),
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
  addProductType: {
    screen: AddProductType,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Product Type" navigation={navigation} disableRightIcon />,
    }),
  },
  addClient: {
    screen: AddClient,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Client" navigation={navigation} disableRightIcon />,
    }),
  },
  addVendor: {
    screen: AddVendor,
    navigationOptions: ({ navigation }) => ({
      header: <BackHeader title="Add Vendor" navigation={navigation} disableRightIcon />,
    }),
  },
});

const VendorStack = createStackNavigator({
  listVendor: {
    screen: ListVendors,
    navigationOptions: ({ navigation }) => ({
      header: <MenuHeader title="Vendors" disabledRightIcon />,
    }),
  },
  addVendorProductEntry: {
    screen: AddVendorProductEntry,
    navigationOptions: ({ navigation }) => ({
      header: (
        <BackHeader
          title="Add Product Entry"
          rightIconName="more-vert"
          navigation={navigation}
          onRightIconPress={() => navigation.state.params.manageMore()}
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
});

const SettingStack = createStackNavigator({
  setting: {
    screen: Setting,
  },
});

ClientsStack.navigationOptions = ({ navigation }) => {
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
        activeTintColor: '#333',
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
