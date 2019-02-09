import React from 'react';
import { Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { ACCENT_COLOR } from '../constant';

export const InputButton = ({ title, onPress, loading, containerViewStyle }) => (
  <Button
    title={title}
    onPress={() => {
      onPress();
      Keyboard.dismiss();
    }}
    containerViewStyle={[styles.buttonContainerStyle, containerViewStyle]}
    backgroundColor={ACCENT_COLOR}
    borderRadius={6}
    color="#fff"
    loading={loading}
    raised
  />
);

const styles = {
  buttonContainerStyle: {
    width: 'auto',
    alignSelf: 'center',
  },
};
