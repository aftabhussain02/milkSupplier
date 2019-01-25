import React from 'react';
import { View } from 'react-native';

export const GroupByList = ({ children }) => (
    <View style={styles.containerStyle}>
        {children}
    </View>
);

const styles = {
    containerStyle: {
        width: '94%',
        flexDirection: 'row',
        backgroundColor: '#74c3e7',
        padding: 10,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 4,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
};
