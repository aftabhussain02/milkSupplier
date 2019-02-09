import React from 'react';
import _ from 'lodash';
import { Constants } from 'expo';
import { View, Text, Platform, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { HEADER_BACKGROUD } from '../constant';

export const MenuHeader = ({
  title,
  onRightIconPress,
  rightIconName,
  onLeftIconPress,
  leftIconName,
  disabledRightIcon,
}) => {
  const { containerStyle, iconContainer, titleStyle, textContainer, iconStyle } = styles;
  return (
    <View style={containerStyle}>
      <StatusBar backgroundColor="#333" barStyle="light-content" />
      <View style={iconContainer}>
        {leftIconName ? (
          <Icon
            raised
            color="#fff"
            name={leftIconName || 'arrow-back'}
            size={24}
            containerStyle={iconStyle}
            onPress={onLeftIconPress}
            underlayColor={HEADER_BACKGROUD}
          />
        ) : (
          <View />
        )}
      </View>
      <View style={textContainer}>
        <Text style={titleStyle}>{_.startCase(title)}</Text>
      </View>
      <View style={iconContainer}>
        {!disabledRightIcon && (
          <Icon
            raised
            color="#fff"
            name={rightIconName || 'exit-to-app'}
            size={20}
            containerStyle={iconStyle}
            onPress={onRightIconPress}
            underlayColor={HEADER_BACKGROUD}
          />
        )}
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 20,
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    paddingBottom: 25,
    paddingTop: 25,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    backgroundColor: HEADER_BACKGROUD,
  },
  iconStyle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: HEADER_BACKGROUD,
  },
  iconContainer: {
    width: '20%',
    alignItems: 'center',
  },
  textContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
};
