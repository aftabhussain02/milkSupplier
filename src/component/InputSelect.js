import React from 'react';
import { Picker, View } from 'react-native';
import _ from 'lodash';
import { InputText } from './InputText';
import { InputError } from './InputError';
import { CustomPicker } from './CustomPicker';

export const InputSelect = ({ 
    data, 
    selectedValue, 
    onValueChange, 
    label,
    error,
    errorText,
    hidden
}) => (
    !hidden &&
    <InputText
        label={label}
    >
    <View
        style={[{
            borderRadius: 6, 
            borderWidth: 1, 
            borderColor: '#CBCBCB', 
            overflow: 'hidden'
        }, 
        error && { borderColor: 'red' }]}
    >
    <CustomPicker 
        data={data}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
    />

    </View>
    <InputError 
        visible={error}
        errorText={errorText}    
        containerStyle={{ marginBottom: 0 }}
    />
    </InputText>
);
