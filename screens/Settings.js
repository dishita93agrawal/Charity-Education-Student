import * as React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Entypo, AntDesign } from '@expo/vector-icons';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      name: '',
      docID: '',
    };
  }

  updateDetails = async () => {
    try {
      db.collection('students').doc(this.state.docID).update({
        name: this.state.name,
      });
      Alert.alert('Profile Updated');
      alert('Profile updated');
    } catch (e) {
      console.log(e);
    }
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('LogIn');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUserDetails = () => {
    var email = this.state.email;
    db.collection('students')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            email: data.email,
            name: data.name,
            docID: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../assets/SettingsScreen.png')}>
            <View style={{ marginTop: 50, marginLeft: 20 }}>
              <Text style={styles.header}>Settings</Text>
            </View>
            <ScrollView
              style={{
                width: '100%',

                justifyContent: 'center',
              }}>
              <KeyboardAvoidingView>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.iconStyle}>
                    <Entypo name={'mail'} size={20} color="#171560" />
                  </View>
                  <Text style={styles.showInfo}>
                    Email : {this.state.email}
                  </Text>
                </View>

                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.iconStyle}>
                      <AntDesign name={'user'} size={20} color="#171560" />
                    </View>
                    <Text style={styles.showInfo}>Name: </Text>

                    <TextInput
                      style={styles.textinput}
                      placeholder={'Name of the Student'}
                      placeholderTextColor="orange"
                      onChangeText={(text) => {
                        this.setState({
                          name: text,
                        });
                      }}
                      value={this.state.name}
                    />
                  </View>

                  <LinearGradient
                    // Button Linear Gradient
                    colors={['#eb3349', '#f45c43']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.updateButton}>
                    <TouchableOpacity
                      onPress={() => {
                        this.updateDetails();
                      }}>
                      <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    // Button Linear Gradient
                    colors={['#171560', '#171565']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.updateButton}>
                    <TouchableOpacity
                      onPress={() => {
                        this.logout();
                      }}>
                      <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </ImageBackground>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 14,
  },

  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    borderRadius: 10,
  },
  textinput: {
    marginTop: 10,
    marginBottom: 5,
    width: '70%',
    height: 40,
    borderColor: '#171580',
    borderWidth: 1.5,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    fontSize: 16,
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  iconStyle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'white',
    borderRightWidth: 1,
    width: 50,
  },
  header: {
    fontSize: 18,
    color: 'white',
  },

  showInfo: {
    fontSize: 18,
    color: '#171580',
    fontFamily: 'cursive',
    marginTop: 10,
    textAlign: 'center',
  },
});
