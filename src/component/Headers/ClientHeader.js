import React from 'react';
import { MoreOption } from '../MoreOption';
import { MoreOptionItem } from '../MoreOptionItem';

export const ClientHeader = ({ navigation }) => (
  <MoreOption>
    <MoreOptionItem title="Profile" onPress={() => navigation.navigate('clientProfile')} />
    <MoreOptionItem title="Generate Bill" />
    <MoreOptionItem title="Random Entry" />
  </MoreOption>
);
