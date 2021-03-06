import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
// import { ButtonComponent } from './ButtonComponent';

export const ConfirmModal = ({ onConfirmPress, onCancelPress, text, visible }) => {
  const { 
    container, 
    modalContainer,
    modalTextContainer, 
    modalTextStyle, 
    iconContainer,
    buttonList,
    buttonStyle
} = styles;

  return (
            <Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={() => {}}
            >
                <View style={container}>
                <View style={modalContainer}>
                    <Icon
                    raised
                    name='error'
                    color='#fff'
                    size={30}
                    containerStyle={iconContainer}
                    />
                    <View style={modalTextContainer}>
                        <Text style={{ fontSize: 16 }}>Warning!</Text>
                        <Text style={modalTextStyle}>{text}</Text>
                        <View style={buttonList}>
                            <Button
                            onPress={() => onConfirmPress()}
                            backgroundColor='#F1C050'
                            containerViewStyle={buttonStyle}
                            title='Confirm'
                            borderRadius={3}
                            small
                            raised
                            />
                            <Button
                            onPress={() => onCancelPress()}
                            backgroundColor='#F1C050'
                            containerViewStyle={buttonStyle}
                            title='Cancel'
                            borderRadius={3}
                            small
                            raised
                            />
                        </View>
                    </View>
                </View>
                </View>
            </Modal>
      );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  modalContainer: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 4,
    width: 260,
    backgroundColor: '#fff',
  },
  modalTextContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingTop: 60,
      paddingBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 4,
      width: '100%'
  },
  modalTextStyle: {
    fontSize: 14,
    padding: 15,
    paddingBottom: 25,
    color: '#969696',
    textAlign: 'center'
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 2,
    borderRadius: 40,
    marginBottom: 30,
    top: 0,
    alignSelf: 'center',
    backgroundColor: '#F1C050'
  },
  buttonList: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around'
  },
  buttonStyle: {
      width: '40%',
      marginLeft: 0,
      marginRight: 0
  }
};
