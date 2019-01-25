import React from 'react';
import { Picker, View } from 'react-native';
import _ from 'lodash';

export const CustomPicker = ({ data, selectedValue, onValueChange, containerStyle, style }) => (
    <View style={containerStyle}>
    <Picker
    selectedValue={selectedValue}
    style={[{ 
        width: '100%',
        padding: 0,
        height: 40,
    }, style]}
    onValueChange={onValueChange}
    >
    {
        data && _.map(data,
            (v, i) => 
            <Picker.Item 
                label={v}
                key={i}
                value={i}
            />
        )
    }
    </Picker>
</View>
);
