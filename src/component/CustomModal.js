import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

export const CustomModel = ({ children, visible, onPressOut }) => {
  const { modalContainer, containerStyle } = styles;

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={() => {}}>
      <TouchableWithoutFeedback onPressOut={onPressOut}>
        <View style={modalContainer}>
          <View style={containerStyle}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.30)',
  },
  containerStyle: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    padding: 20,
    borderRadius: 10,
  },
};
