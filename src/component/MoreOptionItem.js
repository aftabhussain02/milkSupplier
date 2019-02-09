import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { TEXT_COLOR_2 } from '../constant';

export const MoreOptionItem = ({ title, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = {
  containerStyle: {
    padding: 10,
    justifyContent: 'center',
    width: '100%',
  },
  textStyle: {
    fontSize: 14,
    color: TEXT_COLOR_2,
  },
};
