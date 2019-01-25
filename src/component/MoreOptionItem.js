import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TEXT_COLOR_2 } from '../constant';

export const MoreOptionItem = ({ title, onPress }) => (
<TouchableOpacity onPress={onPress}>
    <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{title}</Text>
    </View>
</TouchableOpacity>
);

const styles = {
    containerStyle: {
        padding: 10,
        justifyContent: 'center',
        width: '100%'
    },
    textStyle: {
        fontSize: 14,
        color: TEXT_COLOR_2
    }
}