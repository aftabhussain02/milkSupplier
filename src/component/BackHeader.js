import React from 'react';
import _ from 'lodash';
import { Constants } from 'expo';
import { View, Text, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { HEADER_BACKGROUD } from '../constant';

export const BackHeader = ({ 
    title, 
    navigation, 
    onRightIconPress, 
    rightIconName, 
    disableRightIcon }) => {
    const { containerStyle, iconContainer, titleStyle, textContainer, iconStyle } = styles;
    return (
        <View style={containerStyle}>
            <View style={iconContainer}>
            <Icon
                raised
                color="#fff"
                name="arrow-back"
                size={24}
                containerStyle={iconStyle}
                onPress={() => navigation.goBack()}
                underlayColor={HEADER_BACKGROUD}
            />
            </View>
            <View style={textContainer}>
                <Text style={titleStyle}>{_.startCase(title)}</Text>
            </View>
            <View style={iconContainer}>
            { 
                !disableRightIcon ?
                    <Icon
                        raised
                        color="#fff"
                        name={rightIconName || 'edit'}
                        size={20}
                        containerStyle={iconStyle}
                        onPress={onRightIconPress}
                        underlayColor={HEADER_BACKGROUD}
                    /> :
                    <View />
            }
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 30, 
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
        paddingBottom: 30,
        paddingTop: 30,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        backgroundColor: HEADER_BACKGROUD
    },
    iconStyle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: HEADER_BACKGROUD

    },
    iconContainer: {
        width: '20%',
        alignItems: 'center'
    },
    textContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
        alignSelf: 'center'
    }
};
