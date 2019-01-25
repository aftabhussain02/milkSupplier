import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { InputText, InputButton, InputError, SuccessModal } from '../../component';
import { 
    updateForgotPasswordProp, 
    attemptForgotPassword
} from '../../actions';

class ForgotPassword extends Component {
    onSuccessModalPress() {
        this.props.updateForgotPasswordProp({ prop: 'success', value: false });
        this.props.navigation.navigate('login');
    }

    render() {
        const { 
            container, 
            inputContainer, 
            subHeading,
        } = styles;
        
        const { 
            email, 
            error, 
            loading, 
            success, 
            successText,
            errorMessage 
        } = this.props;
        
        return (
            <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="padding" enabled>
            <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={container}>
                <Text style={subHeading}>You will get password link on your mail.</Text>
                <View style={inputContainer}>

                    <InputText 
                        label="Email"
                        value={email}
                        onChangeText={value => this.props.updateForgotPasswordProp({ prop: 'email', value })}
                        error={'email' in error}
                        errorText={'email' in error && error.email[0]}
                    />
                    <InputError 
                        visible={Object.keys(error) < 1 && errorMessage}
                        errorText={errorMessage && errorMessage}
                    />
                    <InputButton 
                        title="Submit"
                        onPress={
                            () => this.props.attemptForgotPassword(email)
                        }
                        loading={loading}
                    />
                </View>
            </View>
            </ScrollView>
            <SuccessModal
                visible={success}
                onPress={() => this.onSuccessModalPress()}
                text={successText}
            />
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: 40
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 20,        
    },
    subHeading: {
        fontSize: 18,
    },
};

const mapStateToProps = state => {
    const { 
        email,
        error, 
        loading, 
        success, 
        successText,
        errorMessage 
    } = state.forgotPassword;
    return { 
        email,
        error, 
        loading, 
        success, 
        successText,
        errorMessage 
    };
};

export default connect(mapStateToProps, { 
    updateForgotPasswordProp, 
    attemptForgotPassword
})(ForgotPassword);
