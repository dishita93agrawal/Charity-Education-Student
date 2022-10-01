import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ResolvedAnswers from './ResolvedAnswers';
import PendingAnswers from './PendingAnswers';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      studentId: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      helps: [],
      name: '',
    };
  }

  gethelps = () => {
    db.collection('help')
      .where('studentId', '==', this.state.studentId)
      .onSnapshot((snapshot) => {
        var helps = [];
        snapshot.docs.map((doc) => {
          var help = doc.data();
          help['helpId'] = doc.id;
          helps.push(help);
        });
        this.setState({
          helps: helps,
        });
      });
  };

  componentDidMount() {
    this.gethelps();
    this.getUserDetails();
  }
  getUserDetails() {
    db.collection('students')
      .where('email', '==', this.state.email)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length !== 0) {
          snapshot.docs.map((doc) => {
            var studentDet = doc.data();
            this.setState({ name: studentDet.name });
          });
        }
      });
  }

  renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={['#ff7e5f', '#feb47b']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.flatView}>
        <TouchableOpacity
          style={styles.flatListButton}
          onPress={() => {
            this.props.navigation.navigate('AnswerDetails', { details: item });
          }}>
          <Image source={item.image} style={{ width: 50, height: 50 }} />
          <View style={{ margin: 10, alignItems: 'center' }}>
            <Text style={styles.title}>{item.help}</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/HomeScreenStudentBg.png')}>
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{marginTop:40, marginLeft:20}}>
          <Text style={styles.nameOfUser}>Welcome {this.state.name}!</Text>

          <Text style={styles.askdoubt}>
            Feel Free to ask Doubt📝 {'\n'} to{'\n'} World's Best Mentors :)
            {'\n'}👍
          </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: '90%',
              backgroundColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                alert('This feature is coming soon!');
              }}>
              <FontAwesome name="search" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              style={{
                height: 40,
                width: '85%',
                paddingLeft: 20,
              }}
              placeholder="Search Answers"
            />
          </View>

          <TopTab />
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14 ,marginBottom:10},
        tabBarStyle: {
          padding: 10,
          height: 50,
          backgroundColor: '#232268',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          justifyContent:"center", 
           margin:10
        },
        tabBarIndicatorStyle: {
          backgroundColor: null,
        },
      }}>
      <Tab.Screen name="Pending" component={PendingAnswers} />
      <Tab.Screen name="Resolved" component={ResolvedAnswers} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  flatView: {
    borderRadius: 10,
    flexDirection: 'row',
    width: '95%',
    margin: 10,
    padding: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#171560',
  },
  title: {
    fontSize: 18,
    color: '#171560',
   
    textAlign: 'center',
  },

  flatListButton: {
    flexDirection: 'row',
    width: '95%',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover', // or 'stretch'
  },
  nameOfUser: {
    fontSize: 18,
    fontWeight:"bold",
    color: 'white',
  },
  askdoubt: {
    fontSize: 16,
    color: '#fff',
    justifyContent: 'center',
    fontWeight: '200',
    marginTop: 10,
  },

});
