import React from 'react';
import DatePicker from 'react-native-datepicker';
import { InputText } from './InputText';
import { InputError } from './InputError';

export const InputDatePicker = ({
    date,
    error,
    errorText,
    onDateChange,
    format
}) => (
    <InputText
        label="Item Date"
    >
        <DatePicker 
            format={format || 'DD-MM-YYYY'}
            style={[{ 
                borderRadius: 6,
                width: '100%',
                borderWidth: 1,
                borderColor: '#CBCBCB',
                overflow: 'hidden'
            }, error && { borderColor: 'red' }]}
            date={date}
            onDateChange={onDateChange}
            
        />

        <InputError 
            visible={error}
            errorText={errorText}    
            containerStyle={{ marginBottom: 0 }}
        />
    </InputText>
);
