import React from 'react';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { InputButton } from './InputButton';

export const PlansListItem = ({ heading, subHeading, onPress, buttonTitle = 'Choose' }) => {
    const { containerStyle, headingStyle, subHeadingStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={headingStyle}>{_.startCase(heading)}</Text>
            <Text style={subHeadingStyle}>{subHeading}</Text>
            <InputButton 
                title={buttonTitle}
                onPress={onPress}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        borderColor: '#DFDFDF',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
    },
    headingStyle: {
        color: '#25292d',
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    subHeadingStyle: {
        color: '#25292d',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10
    }
};
