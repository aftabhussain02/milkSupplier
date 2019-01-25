import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import { InputError } from './InputError';

export class InputText extends Component {
  state = {
    focus: false,
    autoCompleteFiltered: [],
  };

  onChangeText(value) {
    if (this.props.autoCompleteData) {
      if (!value) {
        this.setState({
          autoCompleteFiltered: [],
        });
      } else {
        this.setState({
          autoCompleteFiltered: this.props.autoCompleteData.filter(v => v.includes(value)),
        });
      }
    }
    this.props.onChangeText(value);
  }

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
        <Text style={labelStyle}>{label}</Text>
        {moneySign ? (
          <Icon
            name="attach-money"
            containerStyle={{
              position: 'absolute',
              left: '32%',
            }}
          />
        ) : (
          <View />
        )}
        <View style={textInputContainer}>
          {children || (
            <TextInput
              value={value}
              onChangeText={v => this.onChangeText(v)}
              secureTextEntry={secureTextEntry}
              onFocus={() => this.setState({ focus: true })}
              onBlur={() => this.setState({ focus: false })}
              multiline={multiline}
              numberOfLines={numberOfLines}
              style={[
                inputStyle,
                this.state.focus && { elevation: 3, borderWidth: 0 },
                moneySign && { paddingLeft: 30 },
                error && { borderColor: 'red' },
              ]}
              keyboardType={keyboardType}
            />
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
          <InputError visible={error} errorText={errorText} containerStyle={{ marginBottom: 0 }} />
        </View>
      </View>
    );
  }

  render() {
    return this.hidden(this.props.hidden);
  }
}

const styles = {
  container: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  labelStyle: {
    fontWeight: 'bold',
    width: '30%',
  },
  inputStyle: {
    borderRadius: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBCBCB',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 20,
    paddingLeft: 20,
  },
  textInputContainer: {
    width: '70%',
  },
  autoCompleteContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#CBCBCB',
    paddingRight: 20,
    paddingLeft: 20,
  },
};
