import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { TEXT_COLOR_2, ACCENT_COLOR } from '../constant';

export const SectionListItem = ({ item, onPress, key, onPressMore, productName, delay }) => {
  const { containerStyle, textStyle, subTitle, amountBadge } = styles;
  const { name, area, payment } = item;
  return (
    <Animatable.View animation="lightSpeedIn" delay={delay} style={containerStyle} key={key}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{ width: '70%' }}>
          <Text style={textStyle}>{name}</Text>
          <Text style={subTitle}>{area || productName || '-'}</Text>
        </View>
      </TouchableNativeFeedback>
      <Text style={amountBadge}>₹{payment}</Text>
      <Icon
        name="more-vert"
        containerStyle={{ alignContent: 'flex-end' }}
        color={ACCENT_COLOR}
        onPress={() => onPressMore(item)}
      />
    </Animatable.View>
  );
};

const styles = {
  containerStyle: {
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 0,
    marginTop: 10,
    marginRight: 10,
    elevation: 1,
    borderLeftWidth: 2,
    borderColor: ACCENT_COLOR,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: TEXT_COLOR_2,
  },
  amountBadge: {
    width: '24%',
    borderRadius: 20,
    borderColor: ACCENT_COLOR,
    borderWidth: 1,
    alignSelf: 'center',
    padding: 4,
    justifyContent: 'center',
    textAlign: 'center',
  },
};
