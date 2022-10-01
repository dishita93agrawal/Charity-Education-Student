import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class Loading extends React.Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        db.collection('students')
          .where('email', '==', user.email)
          .get()
          .then((snapshot) => {
            if (snapshot.docs.length !== 0) {
              console.log('user.email');

              this.props.navigation.navigate('Home');
            } else {
              this.props.navigation.navigate('LogIn');
            }
          });
      } else {
        this.props.navigation.navigate('LogIn');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#D4A608"
          style={styles.spinner}
        />
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginTop: 100,
  },
});
