import { Modal, View, ScrollView } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

export const CustomModel = ({ children, visible, onPressClose }) => {
    const { modalContainer, containerStyle, buttonStyle } = styles;

    return (
        <Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={() => {}}
        >
            <View style={modalContainer}>
                <Button 
                    title="Close"
                    onPress={onPressClose}
                    containerViewStyle={buttonStyle}
                    backgroundColor="#32B2DB"
                />
                <View style={containerStyle}>
                    <ScrollView>
                        {children}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.70)',
    },
    containerStyle: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: 20,
    },
    sectionStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#cecece'
    },
    iconContainer: {
        borderWidth: 1,
        borderColor: '#C7C6C7',
        height: 16,
        width: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    valueContainer: {
        flexDirection: 'row',
        jutifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 4
    },
    buttonStyle: {
        width: '100%',
        overflow: 'hidden',
        marginLeft: 0,
        marginRight: 0
    }
};
