import React from 'react';
import { Picker, View } from 'react-native';
import _ from 'lodash';

export const CustomPicker = ({
  data,
  selectedValue,
  onValueChange,
  containerStyle,
  style,
  children,
}) => (
  <View style={containerStyle}>
    <Picker
      selectedValue={selectedValue}
      style={[
        {
          width: '100%',
          padding: 0,
          height: 40,
          color: 'black',
          fontSize: 20,
        },
        style,
      ]}
      onValueChange={onValueChange}
    >
      {children || (data && _.map(data, (v, i) => <Picker.Item label={v} key={i} value={i} />))}
    </Picker>
  </View>
);
