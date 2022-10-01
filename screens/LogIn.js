import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import {
  Entypo,
  Fontisto,
  FontAwesome5,
  Octicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'gmjadhav2007@gmail.com',

      password: 'Gargi@123',
    };
  }
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        //navigating to home screen(the student list screen)
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorcode = error.code;
        var errorM = error.message;
        alert(errorM);
        console.log(errorM);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/BackgroundLogInScreen.png')}>
          <View style={{ marginLeft: 20, marginTop: 100, marginBottom: 20 }}>
            <Text style={styles.header}>Welcome !!! {'\n'} To </Text>
            <Text style={{ fontSize: 18, color: '#171560' }}>DoubtStar</Text>
          </View>
          <KeyboardAvoidingView style={{ marginTop: 20 }}>
            <View
              style={{
                marginTop: 20,
                width: '95%',
                marginHorizontal: 10,
                borderRadius: 10,
                backgroundColor: '#ff89',
                justifyContent: 'center',
                padding: 10,
                
              }}>
              <View style={[styles.inputContainer,{marginTop:20}]}>
                <View style={styles.iconStyle}>
                  <Entypo name={'mail'} size={20} color="#171560" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Email"
                  placeholderTextColor="grey"
                  onChangeText={(text) => {
                    this.setState({ email: text });
                  }}
                  value={this.state.email}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                  <Entypo name={'eye'} size={20} color="#171560" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Password"
                  placeholderTextColor="grey"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({ password: text });
                  }}
                  value={this.state.password}
                />
              </View>

              <TouchableOpacity
                style={{ padding: 10, alignSelf: 'flex-end', marginRight: 20 }}
                onPress={() => {
                  this.props.navigation.navigate('ForgotPassword');
                }}>
                <Text style={styles.forgotText}>Forgot Password ?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  this.login(this.state.email, this.state.password);
                }}>
                <Text style={styles.loginButtonText}> Login → </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{padding:5, marginTop:10}}
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}>
                <Text style={styles.signUpText}>
                  Not a user ? Register here
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  header: {
    fontSize: 18,
    color: '#171560',
  },

  loginButton: {
    width: '80%',
    height: 50,
    marginTop: 20,
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

  forgotText: {
    fontSize: 16,
    color: 'black',
  },
  signUpText: {
    fontSize: 16,
    textAlign: 'center',

    color: 'black',
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '90%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1.5,
    flexDirection: 'row',
    backgroundColor: '#F5F0EE',
    borderRadius: 10,
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
    color: '#171560',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
