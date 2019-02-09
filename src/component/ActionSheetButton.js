import React from 'react';
import { Text, TouchableNativeFeedback } from 'react-native';

export const ActionSheetButton = ({ title, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <Text style={styles.textStyle}>{title}</Text>
  </TouchableNativeFeedback>
);

const styles = {
  textStyle: {
    width: '80%',
    fontSize: 20,
    padding: 10,
  },
};
