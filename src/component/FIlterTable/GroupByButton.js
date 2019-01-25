import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export const GroupByButton = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{title}</Text>
    </View>
    </TouchableOpacity>
);

const styles = {
    containerStyle: {
        backgroundColor: '#f9f9f9',
        padding: 4,
        borderColor: 'rgb(200, 200, 200)',
        borderWidth: 1,
        margin: 2
    },
    textStyle: {
        color: '#282827'
    }
};
