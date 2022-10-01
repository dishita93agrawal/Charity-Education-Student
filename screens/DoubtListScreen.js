import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
let categoryCodes = {
  Maths: ['#FF5F6DAA', '#FFC371AA'],

  Science: ['#11998EAA', '#38EF7DAA'],

  English: ['#662D8Caa', '#ED1E79AA'],

  SocialScience: ['#009245AA', '#FCEE21AA'],

  Hindi: ['#2E3192AA', '#1BFFFFAA'],

  Others: ['#D4145AAA', '#FBB03BAA'],
};
export default class DoubtListScreen extends Component {
  constructor() {
    super();
    this.state = {
      studentId: firebase.auth().currentUser.uid,
      studentEmail: firebase.auth().currentUser.email,
      doubts: [],
      filteredDoubts: [],
      rawDoubts: [],
      name: '',
      category: '',
      details: '',
    };
  }
  filterQuestions = (selectedCategory) => {
    if (selectedCategory.length !== 0) {
      var filteredDoubts = [];

      this.state.doubts.map((doubt) => {
        if (doubt.category == selectedCategory) {
          filteredDoubts.push(doubt);
        }
      });
      this.setState({ doubts: filteredDoubts });
    } else {
      this.setState({ doubts: this.state.rawDoubts });
    }
  };

  componentDidMount = () => {
    try {
      db.collection('doubts')
        .where('studentEmail', '==', this.state.studentEmail)
        .onSnapshot((snapshot) => {
          var doubts = [];
          snapshot.docs.map((doc) => {
            var doubt = doc.data();
            console.log(doubt);
            doubt['questionId'] = doc.id;
            doubts.push(doubt);
          });
          this.setState({
            doubts: doubts,
            rawDoubts: doubts,
          });
        });
    } catch (e) {
      console.log(e);
    }
  };
  renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={categoryCodes[item.category]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.flatView}>
        <TouchableOpacity
          style={styles.flatListButton}
          onPress={() => {
            this.props.navigation.navigate('DoubtDetails', { details: item });
          }}>
          <View style={{ margin: 10, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name="title" type="MaterialIcons" color="#232268" />
               <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name="alarm" type="MaterialIcons" color="#232268" />
            <Text style={styles.title}>{item.date.toString()}</Text>
            </View>
            <View
              style={{ padding: 5, backgroundColor: '#fffa', borderRadius: 5 }}>
              <Text>{item.doubtStatus}</Text>
            </View>
          </View>
          <Image
            source={{ uri: item.image }}
            style={{ margin: 10, height: 60, width: 60, borderRadius: 10 }}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/HomeScreen.png')}>
          <View style={{marginLeft:10, marginTop:50}}>
          <Text style={styles.askdoubt}>
            Start asking Doubt📝 {'\n'} to{'\n'} World's Best Mentors :)
            {'\n'}
            👍
          </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              marginTop: 40,
            }}>
            <LinearGradient
              // Button Linear Gradient
              colors={
                    this.state.category == 'Maths'
                      ? ['#fff', '#fff']
                      : ['#FF5F6D', '#FFC371']
                  }
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ category: 'Maths' });
                  this.filterQuestions('Maths');
                }}>
                <Text  style={
                        this.state.category == 'Maths'
                          ? { color: '#FF5F6D' }
                          : styles.categoryText
                      }>Maths</Text>
              </TouchableOpacity>
            </LinearGradient>
           

            <LinearGradient
              // Button Linear Gradient
              colors={
                this.state.category == 'Science'
                ?['#fff','#fff']
                :['#11998E', '#38EF7D']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ category: 'Science' });
                  this.filterQuestions('Science');
                }}>
                <Text style={
                  this.state.category == 'Science'
                  ?{color:'#11998E'}
                  :styles.categoryText
                }>Science</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              // Button Linear Gradient
              colors={ this.state.category == 'English'
                ?['#fff','#fff']:['#662D8C', '#ED1E79']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ category: 'English' });
                  this.filterQuestions('English');
                }}>
                <Text style={  this.state.category == 'English'
                  ?{color:'#662D8C'}:styles.categoryText}>English</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              // Button Linear Gradient
              colors={this.state.category == 'SocialScience'
                ?['#fff','#fff']:['#009245', '#FCEE21']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ category: 'SocialScience' });
                  this.filterQuestions('SocialScience');
                }}>
                <Text style={this.state.category == 'SocialScience'
                  ?{color:'#009245'}:styles.categoryText}>SST</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              // Button Linear Gradient
              colors={this.state.category == 'Hindi'
                ?['#fff','#fff']:['#2E3192', '#1BFFFF']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ category: 'Hindi' });
                  this.filterQuestions('Hindi');
                }}>
                <Text style={this.state.category == 'Hindi'
                  ?{color:'#2E3192'}:styles.categoryText}>Hindi</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              // Button Linear Gradient
              colors={this.state.category == 'Others'
                ?['#fff','#fff']:['#D4145A', '#FBB03B']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ category: 'Others' });
                  this.filterQuestions('Others');
                }}>
                <Text style={this.state.category == 'Others'
                  ?{color:'#D4145A'}:styles.categoryText}>Others</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              // Button Linear Gradient
              colors={['#ff0000', '#ff0000']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ category: '' });
                  this.filterQuestions('');
                }}>
                <Text style={styles.categoryText}>x Clear </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {this.state.doubts.length == 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.noText}>
                No doubts asked yet!{'\n'} You can start by adding doubts!
              </Text>
              <Image
                style={{ width: 170, height: 170 }}
                source={require('../assets/DoubtNotFound.png')}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                marginTop: 20,
              }}>
              <FlatList
                data={this.state.doubts}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              try {
                this.props.navigation.navigate('AskDoubt');
              } catch (e) {
                console.log(e);
              }
            }}
            style={styles.touchableOpacityStyle}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  categoryText: {
    color: 'white',
    fontWeight: '500',
  },
  flatView: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
 
  askdoubt: {
    fontSize: 16,
    color: '#fff',
    justifyContent: 'center',
    fontWeight: '200',
  },
  noText: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    width: 70,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171560',
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 5,
  },
 
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171580',
    borderRadius: 25,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignText: 'center',
  },
  flatListButton: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: '#171560',
    margin: 5,
  },
});
