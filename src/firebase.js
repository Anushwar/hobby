import firebase from "firebase/app";
import "firebase/storage";

firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

export const storage = firebase.storage();

export default firebase;
