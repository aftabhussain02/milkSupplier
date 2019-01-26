import React from 'react';
import { MoreOption } from '../MoreOption';
import { MoreOptionItem } from '../MoreOptionItem';

export const VendorHeader = ({ navigation }) => (
  <MoreOption>
    <MoreOptionItem title="Profile" onPress={() => navigation.navigate('vendorProfile')} />
    <MoreOptionItem title="Generate Bill" />
    <MoreOptionItem title="Random Entry" />
  </MoreOption>
);
