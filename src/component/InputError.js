import React from 'react';
import { View, Text } from 'react-native';

export const InputError = ({ errorText, visible, containerStyle }) => (
            visible ?
            <View style={[styles.containerStyle, containerStyle]}>
                <Text style={styles.textStyle}>{errorText}</Text>
            </View>
            : <View />
    );

const styles = {
    containerStyle: {
        alignSelf: 'center',
        marginBottom: 20,
        width: '90%'
    },
    textStyle: {
        color: 'red',
        textAlign: 'center'
    }
};
