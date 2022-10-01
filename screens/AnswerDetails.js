import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import db from '../config';
import firebase from 'firebase';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { ListItem, Avatar, Header, Icon, Card } from 'react-native-elements';
import Modal from 'react-native-modal';
let categoryCodes = {
  Maths: ['#FF5F6DAA', '#FFC371AA'],

  Science: ['#11998EAA', '#38EF7DAA'],

  English: ['#662D8Caa', '#ED1E79AA'],

  SocialScience: ['#009245AA', '#FCEE21AA'],

  Hindi: ['#2E3192AA', '#1BFFFFAA'],

  Others: ['#D4145AAA', '#FBB03BAA'],
};
export default class AnswerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      help: this.props.route.params.details['help'],
      doubtTitle: this.props.route.params.details['doubtTitle'],
      doubtStatus: this.props.route.params.details['doubtStatus'],
      doubtId: this.props.route.params.details['doubtId'],
      doubtDescription: this.props.route.params.details['doubtDescription'],
      category: this.props.route.params.details['category'],
      teacherId: this.props.route.params.details['teacherEmail'],
      teacherName: this.props.route.params.details['teacherName'],
      doubtImage: this.props.route.params.details['doubtImage'],
      doubtDocId: '',
      docId: this.props.route.params.details['helpId'],
      modalVisible: false,
      isImageModalVisible: false,
      Max_Rating: 5,
      Default_Rating: 2,

      rating: 0,
      totalRating: 0,
    };
    this.Star =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    this.Star_With_Border =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  }
  componentDidMount = () => {
    db.collection('doubts')
      .where('doubtId', '==', this.state.doubtId)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var doubt = doc.data();
          this.setState({
            doubtDocId: doc.id,
          });
        });
      });

    db.collection('teachers')
      .where('email', '==', this.state.teacherId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          this.setState({
            rating: doc.data().rating,
            totalRating: doc.data().totalRating,
          });
        });
      });
  };
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={this.state.isImageModalVisible}
        backDropOpacity={0.4}>
        <View>
          <Card
            containerStyle={{
              width: 200,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Avatar source={{ uri: this.state.doubtImage }} size={'large'} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isImageModalVisible: false });
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 15,
                  fontSize: 16,
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </Card>
        </View>
      </Modal>
    );
  };
  markDbresolved() {
    db.collection('doubts')
      .doc(this.state.doubtDocId)
      .update({ doubtStatus: 'resolved' });

    db.collection('help')
      .doc(this.state.docId)
      .update({ doubtStatus: 'resolved' });

    db.collection('teachers')
      .where('email', '==', this.state.teacherId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          var newRating = this.state.rating ;
          var deno = this.state.totalRating + 1;


          db.collection('teachers').doc(doc.id).update({
            rating: newRating,
            totalRating: deno,
          });
        });
      });
    this.props.navigation.goBack();
  }

  UpdateRating(key) {
    this.setState({ Default_Rating: key });
    //Keeping the Rating Selected in state
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.Default_Rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }
    let React_Native_Info_Bar = [];
    //Array to hold the filled or empty Stars
    for (var j = 1; j <= this.state.Max_Rating; j++) {
      React_Native_Info_Bar.push(
        <TouchableOpacity activeOpacity={0.7} key={j}>
          <Image
            style={styles.StarImage}
            source={
              j <= this.state.rating
                ? { uri: this.Star }
                : { uri: this.Star_With_Border }
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/AnswerDetailScreenBg.png')}>
        <SafeAreaProvider style={{ flex: 1, marginTop: 40 }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon
              name="arrow-left"
              type="feather"
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}></Icon>
            <Text style={styles.header}> Answer Details</Text>
          </View>
          <View>
            <Modal
              style={styles.modalView}
              isVisible={this.state.modalVisible}
              backdropOpacity={0.4}
              deviceWidth={Dimensions.get('window').width}
              deviceHeight={Dimensions.get('window').height}
              onBackdropPress={() => this.setState({ modalVisible: false })}>
              <View style={styles.modalMainView}>
                <Text style={{ textAlign: 'center', margin: 5 }}>
                  Give response a rating
                </Text>
                <View style={styles.childView}>{React_Native_Rating_Bar}</View>

                <Text style={{ textAlign: 'center', margin: 5 }}>
                  {/*To show the rating selected*/}
                  {this.state.Default_Rating} / {this.state.Max_Rating}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'orange',
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.markDbresolved();
                  }}>
                  <Text style={{ color: '#171560' }}>Mark resolved</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          {this.showModal()}
          <ScrollView
            style={{
              flex: 1,
            }}>
            <View
              style={{
                width: '95%',
                alignSelf:"center",
                borderRadius: 10,
                marginTop: 50,
                backgroundColor: '#F3E6EFAA',
                justifyContent: 'center',
                padding: 10,
              }}>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name="title" type="MaterialIcons" color="#232268" />
                <Text
                  style={[
                    styles.doubtdetail,
                    { fontWeight: 'bold', marginLeft: 20 },
                  ]}>
                  {this.state.doubtTitle}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 5 }}>
                <Icon name="chevron-right" type="entypo" color="#171560" />
                <Text style={styles.doubtdetail}>
                  {this.state.doubtDescription}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text style={styles.doubtdetail}>Attachment</Text>

                <Icon name="attachment" type="MaterialIcons" color="#171560" />
                <Avatar
                  source={{ uri: this.state.doubtImage }}
                  style={{
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    margin: 10,
                  }}
                  onPress={() => {
                    this.setState({ isImageModalVisible: true });
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <Text style={styles.doubtdetail}>Category : </Text>
                <LinearGradient
                  colors={categoryCodes[this.state.category]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.category}>
                  <Text>{this.state.category} </Text>
                </LinearGradient>
              </View>
            </View>
            <View
              style={{
                width: '95%',
                borderRadius: 10,
                alignSelf:"center",
                marginTop: 50,
                backgroundColor: '#F3E6EFAA',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Text style={[styles.doubtdetail, { fontWeight: 'bold' }]}>
                Answer
              </Text>
              <Text style={styles.doubtdetail}>{this.state.help} </Text>
              <View
                style={{
                  backgroundColor: '#171560',
                  borderRadius: 5,
                  marginTop: 20,
                  margin: 10,
                  padding: 10,
                  
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 16,
                  }}>
                  Mentor Info
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 5,
                  }}>
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../assets/profile.png')}
                  />
                </View>
                <View style={[styles.childView, { marginTop: 5 ,  color: 'white', }]}>
                  {React_Native_Info_Bar}
                </View>
                <Text style={[styles.doubtdetail, { marginTop: 5 ,  color: 'white', }]}>
                  Name : {this.state.teacherName}
                </Text>
                <Text style={[styles.doubtdetail, { marginTop: 5 ,  color: 'white', }]}>
                  Email : {this.state.teacherId}
                </Text>
              </View>
              {this.state.doubtStatus == 'pending' ? (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.doubtdetail}>Doubt Status :</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF804F',
                      borderRadius: 10,
                      padding: 5,
                      alignSelf: 'center',
                      borderWidth: 1.5,
                      marginHorizontal: 10,
                    }}
                    onPress={() => {
                      this.setState({ modalVisible: true });
                    }}>
                    <Text
                      style={[
                        styles.doubtdetail,
                        { color: '#171560', fontSize: 14 },
                      ]}>
                      Mark as complete
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.doubtdetail}>Doubt Status :</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF804F',
                      borderRadius: 10,
                      borderWidth: 1.5,
                      padding: 5,
                      marginHorizontal: 5,
                      width:150
                    }}>
                    <Text style={[styles.doubtdetail, { color: 'white' ,alignItems:'center'}]}>
                      Resolved                 
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.deleteIcon}>
                  <Icon
                    style={{ alignSelf: 'center' }}
                    name="delete"
                    type="MaterialCommunityIcons"
                    color="#171560"
                    onPress={() => {
                      this.deleteDoubtRecord();
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaProvider>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  deleteIcon: {
    width: 150,
    height: 40,
    backgroundColor: '#FF804F',
    borderRadius: 10,
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubtdetail: {
    fontSize: 16,
    color: '#171560',
  },
  category: {
    width: 70,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    fontSize: 16,
    color: '#171560',
    alignSelf: 'center',
  },
  header: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },

  modalMainView: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowColor: '#bbbb',
  },
  StarImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '90%',
    height: '90%',
    padding: 20,
  },
});
