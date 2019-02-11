import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { InputText, InputButton, SuccessModal, InputError } from '../../component';
import {
  updateProductProps,
  addProduct,
  fetchProductsList,
  validate,
  PRODUCT_ERROR,
} from '../../actions';

class AddProduct extends Component {
  onSuccessPress() {
    this.props.fetchProductsList();
    this.props.updateProductProps('success', false);
    this.props.navigation.goBack();
  }

  onSubmit() {
    const rule = {
      name: ['required', 'letters'],
      units: ['checkbox', 'required'],
    };
    this.props
      .validate(this.props, rule, PRODUCT_ERROR)
      .then(() => this.props.addProduct(this.props));
  }

  resolveCheckbox = name => {
    const units = this.props.units.slice();
    const index = units.indexOf(name);
    if (index !== -1) {
      units.splice(index, 1);
    } else {
      units.push(name);
    }
    this.props.updateProductProps('units', units);
  };

  render() {
    const { containerStyle, checkBoxStyle, checkboxContainerStyle } = styles;
    const { name, success, error, errorMessage, message, loading, units, type } = this.props;
    console.log(units.includes('liter'));
    return (
      <View style={containerStyle}>
        <ScrollView>
          <InputText
            label="Name"
            value={name}
            error={'name' in error}
            errorText={'name' in error && error.name[0]}
            onChangeText={value => this.props.updateProductProps('name', value)}
          />
          <InputText
            label="Product Type"
            value={type}
            error={'type' in error}
            errorText={'type' in error && error.type[0]}
            onChangeText={value => this.props.updateProductProps('type', value)}
          />
          <InputText error={'units' in error} errorText={'units' in error && error.units[0]}>
            <View style={checkboxContainerStyle}>
              <CheckBox
                center
                title="Gram"
                checked={units.includes('Gram')}
                onPress={() => this.resolveCheckbox('Gram')}
                containerStyle={checkBoxStyle}
              />

              <CheckBox
                center
                title="Kilogram"
                checked={units.includes('Kilogram')}
                onPress={() => this.resolveCheckbox('Kilogram')}
                containerStyle={checkBoxStyle}
              />

              <CheckBox
                center
                title="Liter"
                checked={units.includes('Liter')}
                onPress={() => this.resolveCheckbox('Liter')}
                containerStyle={checkBoxStyle}
              />
            </View>
          </InputText>
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
        </ScrollView>
        <View>
          <InputButton title="Add" onPress={() => this.onSubmit()} loading={loading} />
        </View>
        <SuccessModal visible={success} onPress={() => this.onSuccessPress()} text={message} />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxStyle: {
    margin: 0,
    backgroundColor: '#fff',
    marginLeft: 0,
    borderColor: '#fff',
  },
  checkboxContainerStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
};

const mapStateToProps = state => {
  const { name, success, error, errorMessage, message, loading, type, units } = state.addProduct;

  return {
    name,
    success,
    error,
    errorMessage,
    message,
    loading,
    type,
    units,
  };
};

export default connect(
  mapStateToProps,
  { addProduct, updateProductProps, fetchProductsList, validate }
)(AddProduct);
