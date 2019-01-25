import React from 'react';
import { View } from 'react-native';

export const ViewList = ({ children }) => (
        <View style={styles.container}>
            {children}
        </View>
    );

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '94%',
        marginTop: 20,
        marginBottom: 20,
    }
};
