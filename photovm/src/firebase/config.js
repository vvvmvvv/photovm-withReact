import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyA0MOgVkGPtHTqsKN55wO_CiF3jWUwWI8I",
    authDomain: "photovm-a1fd0.firebaseapp.com",
    databaseURL: "https://photovm-a1fd0.firebaseio.com",
    projectId: "photovm-a1fd0",
    storageBucket: "photovm-a1fd0.appspot.com",
    messagingSenderId: "502140250227",
    appId: "1:502140250227:web:79b86f2bfc522034eaa206"
}

class Firebase{

    constructor(){
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    // login
    async login(email, password){
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err =>{
            console.log(err);
            return err;
        });
        return user;
    }
    // signin
    async signin(email, password){
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });
        return user;
    }
    // logout
    async logout(){
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
            return err;
        });
        return logout;
    }
}

export default new Firebase();