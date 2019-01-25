import React from 'react';
import { View, Text } from 'react-native';
import { BORDER_COLOR } from '../constant';

export const SectionTitle = ({ key, title }) => (
  <View style={styles.containerStyle} key={key}>
    <Text style={styles.textStyle}>{title}</Text>
  </View>
);

const styles = {
  containerStyle: {
    padding: 10,
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
  },
  textStyle: {
    fontWeight: 'bold',
  },
};
