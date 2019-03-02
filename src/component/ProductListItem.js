import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ACCENT_COLOR } from '../constant';

export const ProductListItem = ({ title, onPress, amount, product, delay }) => {
  const { container, iconContainer, textContainer, titleStyle, amountStyle, productStyle } = styles;
  return (
    <TouchableNativeFeedback onPress={onPress} style={{ width: '100%' }}>
      <Animatable.View delay={delay} animation="lightSpeedIn" style={container}>
        <View style={textContainer}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={productStyle}>{product}</Text>
          <Text style={amountStyle}>${amount}</Text>
        </View>
      </Animatable.View>
    </TouchableNativeFeedback>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    width: '90%',
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    elevation: 1,
    borderLeftWidth: 2,
    borderColor: ACCENT_COLOR,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DB1A24',
    padding: 10,
    borderRadius: 4,
  },
  textContainer: {
    flexDirection: 'row',
  },
  titleStyle: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'gray',
  },
  amountStyle: {
    width: '30%',
    textAlign: 'center',
  },
  productStyle: {
    width: '30%',
    textAlign: 'center',
  },
};
