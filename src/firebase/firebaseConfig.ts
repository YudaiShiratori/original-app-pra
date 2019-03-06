import firebase from 'firebase'
import firestore from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBihmesI82mK9lL43czRbFVcXhoFaVXR1g',
  authDomain: 'original-app-b9263.firebaseapp.com',
  databaseURL: 'https://original-app-b9263.firebaseio.com',
  projectId: 'original-app-b9263',
  storageBucket: 'original-app-b9263.appspot.com',
  messagingSenderId: '429560813214',
};

const firebaseApp = firebase.initializeApp(config)

export default firebase.firestore();
const storage = firebase.storage();
