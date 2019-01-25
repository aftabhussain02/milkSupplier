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
import ListVendor from '../screens/vendors/ListVendors';
import { MenuHeader, BackHeader } from '../component';
import AddProductEntry from '../screens/clients/AddProductEntry';
import ViewClientProfile from '../screens/clients/ViewClientProfile';
import EditClientProfile from '../screens/clients/EditClientProfile';

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
  AddProductEntry: {
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
  home: {
    screen: Home,
  },
});

const VendorStack = createStackNavigator({
  listVendor: {
    screen: ListVendor,
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
                name="add"
                borderWidth={1}
                size={25}
                color={tintColor}
                borderColor={ACCENT_COLOR}
                borderRadius={25}
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
