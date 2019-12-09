import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
  apiKey: "AIzaSyDCDr8InA9WOxMHRXSrYhX3pMq85znKGK8",
  authDomain: "cse316-final.firebaseapp.com",
  databaseURL: "https://cse316-final.firebaseio.com",
  projectId: "cse316-final",
  storageBucket: "cse316-final.appspot.com",
  messagingSenderId: "504824070629",
  appId: "1:504824070629:web:e00e8d26c59ffa59dfef0c",
  measurementId: "G-WPBBPMNPQD"
};

firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;