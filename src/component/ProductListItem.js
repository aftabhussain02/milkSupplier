import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { ACCENT_COLOR } from '../constant';

export const ProductListItem = ({ title, onPress, amount, product }) => {
  const { container, iconContainer, textContainer, titleStyle, amountStyle, productStyle } = styles;
  return (
    <TouchableNativeFeedback onPress={onPress} style={{ width: '100%' }}>
      <View style={container}>
        <View style={textContainer}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={productStyle}>{product}</Text>
          <Text style={amountStyle}>${amount}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    width: '90%',
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: ACCENT_COLOR,
    // borderWidth: 1,
    borderRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DB1A24',
    padding: 10,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
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
