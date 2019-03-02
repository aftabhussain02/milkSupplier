import React from 'react';
import { ActivityIndicator } from 'react-native';
import { LOADER_COLOR } from '../constant';

export const LoadingIndicator = () => 
<ActivityIndicator size="large" style={{ flex: 1, alignSelf: 'center' }} color={LOADER_COLOR} />;
