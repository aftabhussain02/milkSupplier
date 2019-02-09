import React from 'react';
import { View, Text } from 'react-native';

export const ProfileViewItem = ({ heading, title, value, valueComponent, columnContainer }) => {
  const { rowStyle, titleStyle, colContainer, valueStyle, headingContainer, headingStyle } = styles;
  return !heading ? (
    <View style={rowStyle}>
      <View style={[colContainer, columnContainer]}>
        <Text style={titleStyle}>{title}</Text>
      </View>
      <View style={[colContainer, { borderRightWidth: 1 }, columnContainer]}>
        {valueComponent || <Text style={valueStyle}>{value}</Text>}
      </View>
    </View>
  ) : (
    <View style={rowStyle}>
      <View style={[headingContainer, columnContainer]}>
        <Text style={headingStyle}>{heading}</Text>
      </View>
    </View>
  );
};

const styles = {
  titleStyle: {
    fontWeight: '700',
    padding: 15,
  },
  valueStyle: {
    padding: 15,
  },
  colContainer: {
    width: '50%',
    alignItem: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DCE1E5',
  },
  rowStyle: {
    width: '94%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  headingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DCE1E5',
  },
  headingStyle: {
    fontWeight: 'bold',
    padding: 15,
  },
};
