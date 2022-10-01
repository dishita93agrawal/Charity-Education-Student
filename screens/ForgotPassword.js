import { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = { email: '' };
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/ForgotPasswordScreen.png')}>
          <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 40 }}>
            <Icon
              style={{
                alignSelf: 'flex-start',
              }}
              name="arrow-left"
              type="feather"
              color="#171560"
              onPress={() => this.props.navigation.goBack()}></Icon>
            <Text style={styles.signInText}>Forgot Password ?</Text>
          </View>
          <KeyboardAvoidingView style={{ marginTop: 20 }}>
            <View
              style={{
                marginTop: 80,
                width: '95%',
                marginHorizontal: 10,
                borderRadius: 10,
                backgroundColor: '#ff89',
                justifyContent: 'center',
                padding: 10,
              }}>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Entypo name={'mail'} size={25} color="#171560" />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder={'Enter your Email Id'}
                  keyboardType={'email-address'}
                  onChangeText={(text) => {
                    this.setState({
                      email: text,
                    });
                  }}
                  value={this.state.email}
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  if (this.state.email) {
                    firebase
                      .auth()
                      .sendPasswordResetEmail(this.state.email)
                      .then(() => {
                        alert('Email Sent to Reset your password!');
                        this.props.navigation.goBack();
                      })
                      .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        alert(errorMessage);
                      });
                  } else {
                    alert('Please fill a valid email!');
                  }
                }}>
                <Text style={styles.loginButtonText}>
                  Send Password Reset Link →
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signInText: {
    fontSize: 18,
    color: '#171560',
    marginLeft:20
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  loginButton: {
    width: '80%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171560',
    borderRadius: 20,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '90%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0EE',
    borderRadius: 10,
    alignSelf: 'center',
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'white',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    flex: 1,
    fontSize: 16,
    color: '#FF894F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
