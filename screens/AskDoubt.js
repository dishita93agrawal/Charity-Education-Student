import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon, Avatar } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
export default class AskDoubt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      doubt: '',
      category: '',
      studentId: firebase.auth().currentUser.uid,
      title: '',
      cameraPermissions: '',
      modalVisible: false,
      loading: false,
      image:
        'https://o.remove.bg/downloads/e2dad812-edfe-4328-8c2f-35ceb392b02c/image-removebg-preview.png',
      studentName: '',
    };
  }
  getStudentDetails() {
    db.collection('students')
      .where('email', '==', this.state.emailId)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length !== 0) {
          snapshot.docs.map((doc) => {
            var studentDet = doc.data();
            this.setState({ studentName: studentDet.name });
          });
        }
      });
  }
  componentDidMount() {
    this.getStudentDetails();
  }
  takePhotoFromCamera = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        cameraPermissions: status === 'granted',
      });
      if (this.state.cameraPermissions) {
        await ImagePicker.launchCameraAsync({
          compressImageMaxWidth: 290,
          compressImageMaxHeight: 290,
          cropping: true,
          compressImageQuality: 0.9,
        }).then((image) => {
          this.setState({ image: image.uri });
          this.setState({
            modalVisible: false,
          });
        });
      } else {
        alert('Permissions Not Granted')
        this.setState({
          modalVisible: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    this.setState({
      modalVisible: false,
    });
    if (!cancelled) {
      this.setState({ image: uri });
      console.log('Worked' + this.state.image);
    }
  };

  fetchImage = async (uniqueId) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('doubts/' + this.state.emailId + '/' + uniqueId);
    storageRef
      .getDownloadURL()
      .then((url) => {
        console.log('fetched' + url);

        this.setState({ image: url });
        try {
          db.collection('doubts').add({
            studentId: this.state.studentId,
            doubt: this.state.doubt,
            studentEmail: this.state.emailId,
            category: this.state.category,
            doubtStatus: 'pending',
            title: this.state.title,
            image: url,
            doubtId: uniqueId,
            date: new Date().toDateString(),
            studentName: this.state.studentName,
          });
        } catch (e) {
          console.log(e);
        }

        this.setState({ loading: false });
        alert('Doubt Added');
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.log('error' + error);
        Alert.alert('Something went wrong in media uplaod, try again');
        this.setState({
          image:
            'https://o.remove.bg/downloads/e2dad812-edfe-4328-8c2f-35ceb392b02c/image-removebg-preview.png',
        });
      });
  };

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }
  askDoubt = async () => {
    if (
      this.state.title &&
      this.state.doubt &&
      this.state.category &&
      this.state.image
    ) {
      console.log('Askdoubt approaching');

      var uniqueId = this.createUniqueId();
      var response = await fetch(this.state.image);
      var blob = await response.blob();
      console.log('blob' + 'completed');
      var ref = await firebase
        .storage()
        .ref()
        .child('doubts/' + this.state.emailId + '/' + uniqueId);
      console.log('ref');

      ref.put(blob).then((response) => {
        console.log('fetched approaching');

        this.fetchImage(uniqueId);
      });
    } else {
      alert('All fields required');
      Alert.alert(
        'Error',
        'All fields are required!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/AskDoubtScreen.png')}>
          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginTop: 50,
              }}>
              <Icon
                style={{ alignSelf: 'flex-start' }}
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() =>
                  this.state.loading ? null : this.props.navigation.goBack()
                }
              />

              <Text style={styles.askText}>Ask Doubt</Text>
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
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: -13,
                      right: -10,
                      margin: 10,
                      padding: 10,
                    }}
                    onPress={() => this.setState({ modalVisible: false })}>
                    <MaterialIcons
                      name="cancel"
                      size={24}
                      color="#2460a7ff"
                      onPress={() => this.setState({ modalVisible: false })}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center', margin: 5, padding: 5 }}>
                    Choose An Option
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.takePhotoFromCamera();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <Feather name="camera" size={24} color="#2460a7ff" />
                      <Text style={{ textAlign: 'center' }}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.selectPicture();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <FontAwesome name="photo" size={24} color="#2460a7ff" />
                      <Text style={{ textAlign: 'center' }}>Photos</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            <View
              style={{
                marginTop: 70,
                width: '95%',
                marginHorizontal: 10,
                borderRadius: 10,
                backgroundColor: '#63B48BBB',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Text
                style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>
                Doubt Title
              </Text>
              <TextInput
                style={styles.textinput}
                placeholder={'Enter Title of Doubt '}
                placeholderTextColor="white"
                onChangeText={(text) => {
                  this.setState({
                    title: text,
                  });
                }}
                value={this.state.title}
              />
              <Text
                style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>
                Detail Description
              </Text>

              <TextInput
                style={[styles.textinput, { height: 100 }]}
                placeholder={'Enter Description of Doubt'}
                placeholderTextColor="white"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    doubt: text,
                  });
                }}
                value={this.state.doubt}
              />
              <View
                style={{
                  width: '80%',
                  flexDirection: 'row',
                  margin: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#ffffff33',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    this.setState({ modalVisible: true });
                  }}>
                  <Icon name="attachment" type="MaterialIcons" color="white" />

                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Attach file
                  </Text>
                </TouchableOpacity>

                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri: this.state.image,
                  }}
                />
              </View>

              <Text
                style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>
                Select Category
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  flexWrap: 'wrap',
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
                    }}>
                    <Text
                      style={
                        this.state.category == 'Maths'
                          ? { color: '#FF5F6D' }
                          : styles.categoryText
                      }>
                      Maths
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  // Button Linear
                  colors={
                    this.state.category == 'Science'
                      ? ['#fff', '#fff']
                      : ['#11998E', '#38EF7D']
                  }
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ category: 'Science' });
                    }}>
                    <Text
                      style={
                        this.state.category == 'Science'
                          ? { color: '#11998E' }
                          : styles.categoryText
                      }>
                      Science
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  // Button Linear Gradient
                  colors={
                    this.state.category == 'English'
                      ? ['#fff', '#fff']
                      : ['#662D8C', '#ED1E79']
                  }
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ category: 'English' });
                    }}>
                    <Text
                      style={
                        this.state.category == 'English'
                          ? { color: '#662D8C' }
                          : styles.categoryText
                      }>
                      English
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  // Button Linear Gradient
                  colors={
                    this.state.category == 'SocialScience'
                      ? ['#fff', '#fff']
                      : ['#009245', '#FCEE21']
                  }
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ category: 'SocialScience' });
                    }}>
                    <Text
                      style={
                        this.state.category == 'SocialScience'
                          ? { color: '#009245' }
                          : styles.categoryText
                      }>
                      SST
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  // Button Linear Gradient
                  colors={
                    this.state.category == 'Hindi'
                      ? ['#fff', '#fff']
                      : ['#2E3192', '#1BFFFF']
                  }
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ category: 'Hindi' });
                    }}>
                    <Text
                      style={
                        this.state.category == 'Hindi'
                          ? { color: '#2E3192' }
                          : styles.categoryText
                      }>
                      Hindi
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>

                <LinearGradient
                  // Button Linear Gradient
                  colors={
                    this.state.category == 'Others'
                      ? ['#fff', '#fff']
                      : ['#D4145A', '#FBB03B']
                  }
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ category: 'Others' });
                    }}>
                    <Text
                      style={
                        this.state.category == 'Others'
                          ? { color: '#D4145A' }
                          : styles.categoryText
                      }>
                      Others
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <LinearGradient
                // Button Linear Gradient
                colors={['#eb3349', '#f45c43']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.updateButton}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ loading: true });
                    this.askDoubt();
                  }}>
                  {this.state.loading ? (
                    <Text style={styles.buttonText}> Loading</Text>
                  ) : (
                    <Text style={styles.buttonText}> Submit</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
    width: '90%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 10,
    padding: 5,
    color: '#171560',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
  categoryText: {
    color: 'white',
  },
  askText: {
    color: 'white',
    fontWeight: '400',
    marginLeft: '20%',
    alignSelf: 'center',
  },
  modalView: {
    alignSelf: 'center',
    borderColor: '#bbbb',
    width: '60%',
    height: '60%',
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
});
