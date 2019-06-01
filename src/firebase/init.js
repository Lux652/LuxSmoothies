  import firebase from 'firebase'
  import firestore from 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(config);
//   firebaseApp.firestore().settings({ timestampsInSnapshots: true});

  // export firestore db

  export default firebaseApp.firestore();