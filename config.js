import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAiZtNpv_H-A9AhuAFYD3OchT4G6KSCUKA",
  authDomain: "charity-education-app.firebaseapp.com",
  projectId: "charity-education-app",
  storageBucket: "charity-education-app.appspot.com",
  messagingSenderId: "346603346402",
  appId: "1:346603346402:web:a3745f8b7d23dc931041bb"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export default firebase.firestore();
