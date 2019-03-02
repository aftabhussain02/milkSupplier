import React from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const ProfileView = ({ children, key, style, delay }) => (
  <Animatable.View
    animation="fadeInUp"
    delay={delay || 100}
    style={[{ paddingTop: 20, elevation: 2 }, style]}
    key={key}
  >
    {children}
  </Animatable.View>
);
