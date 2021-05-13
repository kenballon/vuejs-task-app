import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7bmRPB5DULpffaJtwilrAjxbBbuvNQ6k",
    authDomain: "vue-app-task-tracker.firebaseapp.com",
    projectId: "vue-app-task-tracker",
    storageBucket: "vue-app-task-tracker.appspot.com",
    messagingSenderId: "807430124167",
    appId: "1:807430124167:web:c211d0f07915f8e8adfe22"
};

// init firebase 
firebase.initializeApp(firebaseConfig);

// init firestore services 
const projectFireStore = firebase.firestore();

export { projectFireStore }