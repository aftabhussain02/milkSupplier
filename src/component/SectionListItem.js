import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BORDER_COLOR, TEXT_COLOR_2 } from '../constant';

export const SectionListItem = ({ name, key, onPress, area }) => {
  const { containerStyle, textStyle, subTitle } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={containerStyle} key={key}>
        <Text style={textStyle}>{name}</Text>
        <Text style={subTitle}>{area}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: {
    padding: 10,
    borderColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  textStyle: {},
  subTitle: {
    fontSize: 12,
    color: TEXT_COLOR_2,
  },
};
