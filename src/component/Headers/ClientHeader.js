import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { MoreOption } from '../MoreOption';
import { MoreOptionItem } from '../MoreOptionItem';

export const ClientHeader = ({ navigation, onPress }) => (
  <MoreOption>
    <MoreOptionItem
      title="Profile"
      onPress={() => {
        onPress();
        navigation.navigate('clientProfile');
      }}
    />
    <MoreOptionItem
      title="Add Credit"
      onPress={() => {
        onPress();
        navigation.navigate('addCredit');
      }}
    />
    {/* <MoreOptionItem title="Generate Bill" />
    <MoreOptionItem title="Random Entry" /> */}
  </MoreOption>
);
