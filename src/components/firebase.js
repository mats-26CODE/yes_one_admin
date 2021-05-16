import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyArmPHatxt6tCFfqSC0kU-ci4tlXm0xqyE",
    authDomain: "yesproone.firebaseapp.com",
    projectId: "yesproone",
    storageBucket: "yesproone.appspot.com",
    messagingSenderId: "228607821704",
    appId: "1:228607821704:web:aac08f3876a89b234d5c3d",
    measurementId: "G-2BBCQE7N2X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();

export { auth, storage };
export default db;