import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export const MenuButton = ({ title, onPress, iconName }) => {
  const { container, chevronStyle, iconContainer, titleStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={{ width: '100%' }}>
      <View style={container}>
        <Icon name={iconName} containerStyle={iconContainer} />
        <Text style={titleStyle}>{title}</Text>
        <Icon name="chevron-right" containerStyle={chevronStyle} />
      </View>
    </TouchableOpacity>
  );
};

export const styles = {
  container: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 6,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'flex-start',
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
  },
};
