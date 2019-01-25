import React from 'react';
import { View, Text } from 'react-native';

export const ViewItem = ({ label, value }) => {
    const { containerStyle, labelstyle, valueStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelstyle}>{label}</Text>
            <Text style={valueStyle}>{value}</Text>
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10
    },
    labelstyle: {
        fontWeight: 'bold',
        width: '50%',  
    },
    valueStyle: {
        width: '50%',  
    },
};
