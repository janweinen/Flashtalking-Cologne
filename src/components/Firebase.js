import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvFGkQbTEhzOkO7JPu4dP7nqvYEN6tk1w",
  authDomain: "flashtalking-ec123.firebaseapp.com",
  databaseURL: "https://flashtalking-ec123.firebaseio.com",
  projectId: "flashtalking-ec123",
  storageBucket: "flashtalking-ec123.appspot.com",
  messagingSenderId: "28234528189",
  appId: "1:28234528189:web:d7b64aa9b3dc3e4f28ced4",
  measurementId: "G-XJKVGYCK6G"
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore();
export const auth = firebase.auth();

export const authentication = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async event => {
  event.preventDefault();
  try {
    await firebase.auth().signOut();
    console.log("Logged out");
  } catch (e) {
    console.log(e);
  }
};

export const firestoreAdd = async (collection, data) => {
  console.log(collection, data);
  const store = await database.collection(collection);
  store.add(data);
};

export const firestoreDelete = async (collection, id) => {
  console.log(collection, id);
  const store = await database.collection(collection);
  store.doc(id).delete();
};
/*
export const firestoreRequest = async (collection, doc) => {
  const request = await database.collection(collection).doc(doc);
  const snapshot = await request.get();
  return snapshot.data();
};

export const firestoreSave = async (collection, doc, data) => {
  const store = await database.collection(collection).doc(doc);
  store.set(data);
};

export const firestoreUpdate = async (collection, doc, data) => {
  const store = await database.collection(collection).doc(doc);
  store.update(data);
};

export const firestoreAdd = async (collection, data) => {
  console.log(collection, data);
  const store = await database.collection(collection);
  store.add(data);
};

export const getFirestore = async collection => {
  const request = await database.collection(collection);
  const snapshot = await request.get();
  return snapshot.docs.map(doc => doc.data());
};
*/
