import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { InputText } from './InputText';
import { InputError } from './InputError';
import { CustomPicker } from './CustomPicker';
import { ACCENT_COLOR } from '../constant';

export const InputSelect = ({
  data,
  selectedValue,
  onValueChange,
  label,
  error,
  errorText,
  hidden,
  children,
}) =>
  !hidden && (
    <InputText label={label}>
      <View
        style={[
          {
            overflow: 'hidden',
            borderBottomColor: ACCENT_COLOR,
            borderBottomWidth: 1,
            marginTop: 20,
          },
          error && { borderBottomColor: 'red' },
        ]}
      >
        <CustomPicker data={data} selectedValue={selectedValue} onValueChange={onValueChange}>
          {children}
        </CustomPicker>
      </View>
      <InputError visible={error} errorText={errorText} containerStyle={{ marginBottom: 0 }} />
    </InputText>
  );
