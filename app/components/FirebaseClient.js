var firebase = require('firebase');

var config = {
apiKey: "AIzaSyDrvgpAue0ufw2MLwEKpV6sWQU3ovw658Y",
    authDomain: "qsystem-71527.firebaseapp.com",
    databaseURL: "https://qsystem-71527.firebaseio.com",
    projectId: "qsystem-71527",
    storageBucket: "qsystem-71527.appspot.com",
    messagingSenderId: "644304111166"
};

firebase = firebase.initializeApp(config);

module.exports = firebase