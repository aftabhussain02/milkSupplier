import React from 'react';
import { Text, TouchableNativeFeedback } from 'react-native';

export const ActionSheetButton = ({ title, onPress }) => (
  <TouchableNativeFeedback style={{ width: '80%' }} onPress={onPress}>
    <Text style={styles.textStyle}>{title}</Text>
  </TouchableNativeFeedback>
);

const styles = {
  textStyle: {
    fontSize: 20,
    padding: 10,
  },
};
