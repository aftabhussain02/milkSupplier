import React from 'react';
import { ScrollView, View } from 'react-native';

export const ProductList = ({ children }) => (
  <ScrollView>
    <View style={styles.container}>{children}</View>
  </ScrollView>
);

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
  },
};
