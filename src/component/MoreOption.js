import React from 'react';
import { View } from 'react-native';
import { BORDER_COLOR } from '../constant';

export const MoreOption = ({ children }) => (
  <View
    style={{
      borderWidth: 1,
      borderColor: BORDER_COLOR,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1000,
      overflow: 'hidden',
      backgroundColor: '#fff',
    }}
  >
    {children}
  </View>
);
