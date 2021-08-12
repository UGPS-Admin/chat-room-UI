var firebaseConfig = {
    apiKey: "AIzaSyDFsV9X382Zi3KS8tk69Qid2FgCuOQLK7U",
    authDomain: "chatroom-a3179.firebaseapp.com",
    projectId: "chatroom-a3179",
    storageBucket: "chatroom-a3179.appspot.com",
    messagingSenderId: "237057797812",
    appId: "1:237057797812:web:908d41ee9ba7b454adf1e1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();