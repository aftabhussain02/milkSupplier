import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { ACCENT_COLOR } from '../constant';

export const MenuButton = ({ title, onPress, iconName }) => {
  const { container, chevronStyle, iconContainer, titleStyle } = styles;
  return (
    <TouchableNativeFeedback onPress={onPress} style={{ width: '100%' }}>
      <View style={container}>
        <Icon name={iconName} containerStyle={iconContainer} color={ACCENT_COLOR} />
        <Text style={titleStyle}>{title}</Text>
        <Icon color="gray" name="chevron-right" containerStyle={chevronStyle} />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    width: '94%',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderColor: ACCENT_COLOR,
    borderWidth: 1,
  },
  chevronStyle: {
    alignSelf: 'flex-end',
  },
  iconContainer: {
    marginRight: 10,
  },
  titleStyle: {
    fontWeight: 'bold',
    flex: 1,
    color: 'gray',
    fontSize: 16,
  },
};
