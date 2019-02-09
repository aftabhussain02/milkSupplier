import React from 'react';
import { View, Text } from 'react-native';
import { ACCENT_COLOR } from '../constant';

export const SectionTitle = ({ key, title }) => (
  <View style={styles.containerStyle} key={key}>
    <Text style={styles.textStyle}>{title}</Text>
  </View>
);

const styles = {
  containerStyle: {
    width: '14%',
    position: 'absolute',
    left: 20,
    top: 10,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: ACCENT_COLOR,
  },
};
