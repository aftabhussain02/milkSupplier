import React, { Component } from 'react';
import { ScrollView, View, Text, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, InputError } from '../../component';
import { updateLoginProp, attemptLogin } from '../../actions/loginActions';

class Login extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    );
  }

  onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };
  render() {
    const { container, heading, inputContainer, footerButtonStyle, footerContainer } = styles;
    const { email, password, error, loading, errorMessage } = this.props;

    return (
      <View style={container}>
        <ScrollView>
          <Text style={heading}>Login</Text>
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
              containerViewStyle={{ marginTop: 20 }}
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
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
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
    alignSelf: 'center',
    marginTop: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
