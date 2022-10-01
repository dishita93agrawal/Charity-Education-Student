import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import db from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { Avatar, Icon, Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
let categoryCodes = {
  Maths: ['#FF5F6DAA', '#FFC371AA'],

  Science: ['#11998EAA', '#38EF7DAA'],

  English: ['#662D8Caa', '#ED1E79AA'],

  SocialScience: ['#009245AA', '#FCEE21AA'],

  Hindi: ['#2E3192AA', '#1BFFFFAA'],

  Others: ['#D4145AAA', '#FBB03BAA'],
};
export default class DoubtDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.route.params.details['category'],
      doubts: this.props.route.params.details['doubt'],
      doubtTitle: this.props.route.params.details['title'],
      doubtStatus: this.props.route.params.details['doubtStatus'],
      questionId: this.props.route.params.details['questionId'],
      doubtImage: this.props.route.params.details['image'],
      modalVisible: false,
      isImageModalVisible: false,
    };
  }

  deleteDoubtRecord = () => {
    db.collection('doubts').doc(this.state.questionId).delete();
    alert('Your Doubt has been Deleted !! ');
    Alert.alert('Your Doubt has been Deleted !!');
    this.props.navigation.navigate('Home');
  };
  showModal = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                    fontWeight: '400',
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
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/DoubtDetail.png')}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
                marginTop: 30,
              }}>
              <Icon
                style={{
                  alignSelf: 'flex-start',
                }}
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>
              <Text style={[styles.header, { color: '#fff' }]}>
                Doubt Details
              </Text>
            </View>
            {this.showModal()}
            <ScrollView
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  width: '95%',
                  borderRadius: 10,
                  alignSelf: 'center',
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
                  <Text style={styles.doubtdetail}>{this.state.doubts}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.doubtdetail}>Attachment</Text>

                  <Icon
                    name="attachment"
                    type="MaterialIcons"
                    color="#171560"
                  />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
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
});
