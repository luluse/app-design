import * as firebase from 'firebase';

import { FIREBASE_AUTH, PROJECT_ID } from '@env'; 


// Initialize Firebase
const firebaseConfig = {
  apiKey: `${FIREBASE_AUTH}`,
  authDomain: 'app-design.firebaseapp.com',
  databaseURL: 'https://app-design.firebaseio.com',
  projectId: `${PROJECT_ID}`,
  storageBucket: 'app-design.appspot.com',
  // messagingSenderId: 'sender-id',
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);

export default firebase;