import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, InputError } from '../../component';
import { updateLoginProp, attemptLogin } from '../../actions/loginActions';

class Login extends Component {
  render() {
    const {
      container,
      heading,
      inputContainer,
      subHeading,
      footerButtonStyle,
      footerContainer,
    } = styles;
    const { email, password, error, loading, errorMessage } = this.props;

    return (
      <View style={container}>
        <Text style={heading}>Login</Text>
        <Text style={subHeading}>Use a local account to log in.</Text>
        <View style={inputContainer}>
          <InputText
            label="Email"
            value={email}
            onChangeText={value =>
              this.props.updateLoginProp({
                prop: 'email',
                value,
              })
            }
            error={'email' in error}
            errorText={'email' in error && error.email[0]}
          />
          <InputText
            label="Password"
            value={password}
            onChangeText={value => this.props.updateLoginProp({ prop: 'password', value })}
            secureTextEntry
            error={'password' in error}
            errorText={'password' in error && error.password[0]}
          />
          <InputError
            visible={Object.keys(error) < 1 && errorMessage}
            errorText={errorMessage && errorMessage}
          />
          <InputButton
            title="Submit"
            onPress={() =>
              this.props
                .attemptLogin(email, password)
                .then(() => this.props.navigation.navigate('AuthCheck'))
            }
            loading={loading}
          />
        </View>
        <View style={footerContainer}>
          <Text
            style={footerButtonStyle}
            onPress={() => this.props.navigation.navigate('forgotPassword')}
          >
            Forgot your password?
          </Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
  },
  footerButtonStyle: {
    color: '#337ab7',
  },
  footerContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
  },
};

const mapStateToProps = state => {
  const { email, password, error, loading, errorMessage } = state.login;
  return { email, password, error, loading, errorMessage };
};

export default connect(
  mapStateToProps,
  { updateLoginProp, attemptLogin }
)(Login);
