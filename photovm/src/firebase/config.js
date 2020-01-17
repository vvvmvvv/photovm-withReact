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

    async getUserState(){
        return new Promise(resolve =>{
            this.auth.onAuthStateChanged(resolve);
        });
    }

    // fetching photos

    async getPhotos(){
        let photosArray = [];
        const photos = await firebase.firestore().collection('Photos').get();
        photos.forEach(doc => {
            photosArray.push({id:doc.id, data: doc.data()});
        });
        return photosArray;
    }

    async getPhoto(photoid){
        const photo = await firebase.firestore().collection('Photos').doc(photoid).get();
        const photoData = photo.data();
        return photoData;
    }





    async createPhoto(photo){
        //console.log(photo);
        const storageRef = firebase.storage().ref();
        const storageChild = storageRef.child(photo.photography.name);
        const photoPhotography = await storageChild.put(photo.photography); //upload    
        const downloadUrl = await storageChild.getDownloadURL();    // download
        const fileRef = photoPhotography.ref.location.path;

        let newPhoto = {
            title: photo.title,
            description: photo.description,
            photography: downloadUrl,
            fileref: fileRef
        }

        const firestorePhoto = await firebase.firestore().collection('Photos').add(newPhoto).catch(err => {
            console.log(err);
            return err;
        });
        return firestorePhoto;
    }

     updatePhoto(photoid, photoData){
        console.log(photoid, photoData);
    }

    async deletePhoto(photoid, fileref){
        const storageRef = firebase.storage().ref();
        await storageRef.child(fileref).delete().catch(err => {
            console.log(err);
        });
        console.log("Image Deleted");
        const photo = await firebase.firestore().collection("Photos").doc(photoid).delete().catch(err => {
            console.log(err);
        });
        console.log("Photo Deleted");

        return photo;

    }
}

export default new Firebase();