import React from 'react';
import { View, Text } from 'react-native';

export const ProfileView = ({ children, key }) => (
  <View style={{ paddingTop: 20, elevation: 2 }} key={key}>
    {children}
  </View>
);
