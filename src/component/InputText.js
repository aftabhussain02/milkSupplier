import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import _ from 'lodash';
import FloatingLabel from 'react-native-floating-labels';
import { Icon } from 'react-native-elements';
import { InputError } from './InputError';
import { ACCENT_COLOR } from '../constant';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export class InputText extends Component {
  state = {
    focus: false,
    autoCompleteFiltered: [],
  };

  hidden(hide) {
    if (hide) {
      return <View />;
    }
    const {
      label,
      value,
      secureTextEntry,
      moneySign,
      children,
      multiline,
      numberOfLines,
      error,
      errorText,
      keyboardType,
      autoCompleteData,
      onChangeText,
    } = this.props;

    const {
      labelStyle,
      container,
      inputStyle,
      textInputContainer,
      autoCompleteContainer,
      autoCompleteText,
    } = styles;

    return (
      <View style={container}>
        {children || (
          <FloatingLabel
            multiline={multiline}
            numberOfLines={numberOfLines}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            style={[textInputContainer, multiline && { height: 'auto' }]}
            inputStyle={[inputStyle, error && { borderColor: 'red' }, multiline && { height: 100 }]}
            labelStyle={labelStyle}
            secureTextEntry={secureTextEntry}
          >
            {label}
          </FloatingLabel>
        )}
        {autoCompleteData && this.state.focus && (
          <View style={autoCompleteContainer}>
            {_.map(this.state.autoCompleteFiltered, v => (
              <TouchableOpacity
                onPress={() => {
                  onChangeText(v);
                  Keyboard.dismiss();
                }}
              >
                <Text style={autoCompleteText}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <InputError
          visible={error}
          errorText={errorText}
          containerStyle={{ marginBottom: 0, width: 280 }}
        />
      </View>
    );
  }

  render() {
    return this.hidden(this.props.hidden);
  }
}

const styles = {
  container: {
    flex: 1,
  },
  labelStyle: {
    color: 'gray',
    marginBottom: 10,
  },
  inputStyle: {
    borderWidth: 0,
    borderColor: ACCENT_COLOR,
    borderBottomWidth: 1,
  },
  textInputContainer: {
    width: widthPercentageToDP('90%'),
  },
  autoCompleteContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#CBCBCB',
    paddingRight: 20,
    paddingLeft: 20,
  },
};
