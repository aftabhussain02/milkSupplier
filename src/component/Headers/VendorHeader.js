import React from 'react';
import { MoreOption } from '../MoreOption';
import { MoreOptionItem } from '../MoreOptionItem';

export const VendorHeader = ({ navigation, onPress }) => (
  <MoreOption>
    <MoreOptionItem
      title="Profile"
      onPress={() => {
        onPress();
        navigation.navigate('vendorProfile');
      }}
    />
    <MoreOptionItem
      title="Add Debit"
      onPress={() => {
        onPress();
        navigation.navigate('addDebit');
      }}
    />
    {/* <MoreOptionItem title="Generate Bill" />
    <MoreOptionItem title="Random Entry" /> */}
  </MoreOption>
);
