import React from 'react';
import { View } from 'react-native';

export const PlansList = ({ children }) => (
    <View style={styles.containerStyle}> 
    {children}
    </View>
);

const styles = { 
    containerStyle: {
        width: '90%',
        alignItems: 'center',
        paddingBottom: 20,
        alignSelf: 'center'
    }
};

