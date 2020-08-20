import firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyCAwUHGyPeF-G988fSoI9u6zhFconry6mo",
    authDomain: "teste-code7.firebaseapp.com",
    databaseURL: "https://teste-code7.firebaseio.com",
    projectId: "teste-code7",
    storageBucket: "teste-code7.appspot.com",
    messagingSenderId: "246073022921",
    appId: "1:246073022921:web:cf9b90ca94b093b202f018",
    measurementId: "G-42G69KG819"
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;