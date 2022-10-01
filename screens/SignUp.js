import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import db from '../config';
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

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    };
  }
  signUp = (email, password, confirmPassword) => {
    //checking if the password and confirm password are matching
    if (password != confirmPassword) {
      alert("Passwords don't match");
      Alert.alert("Passwords don't match");
    } else {
      //calling firebase signUp function
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('students').add({
            name: this.state.name,
            email: this.state.email.toLowerCase(),
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
          });
          alert('Student added successfully');
          Alert.alert('Student added successfully');
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorM = error.message;
          console.log(errorM);
        });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/BackgroundSignUpScreen.png')}>
          <View style={{marginTop:100, padding:10, marginLeft:10}}>
          <Text style={styles.signInText}>Register</Text>
</View>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: 20,
                  width: '95%',
                  marginHorizontal: 10,
                  borderRadius: 10,
                  backgroundColor: '#7bbe',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <View style={[styles.inputContainer, { marginTop: 30 }]}>
                  <View style={styles.iconStyle}>
                    <AntDesign name={'user'} size={20} color="#171560" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder={'Enter your Name'}
                    onChangeText={(text) => {
                      this.setState({
                        name: text,
                      });
                    }}
                    value={this.state.name}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <Entypo name={'mail'} size={20} color="#171560" />
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

                <View style={styles.inputContainer}>
                  <View style={styles.iconStyle}>
                    <AntDesign name={'eye'} size={20} color="#171560" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        password: text,
                      });
                    }}
                    value={this.state.password}
                  />
                </View>
                <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                  <View style={styles.iconStyle}>
                    <AntDesign name={'eyeo'} size={20} color="#171560" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder={'Confirm Password'}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                      this.setState({
                        confirmPassword: text,
                      });
                    }}
                    value={this.state.confirmPassword}
                  />
                </View>

                <TouchableOpacity
                  style={styles.signUpButton}
                  onPress={() => {
                    this.signUp(
                      this.state.email,
                      this.state.password,
                      this.state.confirmPassword,
                      this.state.name
                    );
                  }}>
                  <Text style={styles.buttonText}>Sign Up → </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignSelf:'center', padding:10, marginBottom:10, marginTop:10}}
                  onPress={() => this.props.navigation.navigate('LogIn')}>
                  <Text
                    style={{
                      fontSize: 16,
                    
                    }}>
                    Already a User ? Login
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
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
  signInText: {
    fontSize: 18,
  },

  signUpButton: {
    width: '80%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171560',
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonText: {
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
