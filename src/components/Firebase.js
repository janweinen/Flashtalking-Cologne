import firebase from "firebase/app";
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
    console.log(error.message);
    return error.message;
  }
};

export const firestoreAdd = async (collection, data) => {
  const store = database.collection(collection);
  await store.add(data);
};

export const firestoreDelete = async (collection, id) => {
  const store = database.collection(collection);
  await store.doc(id).delete();
};

export const firestoreUpdate = async (collection, doc, data) => {
  const store = database.collection(collection).doc(doc);
  await store.update(data);
};

export const store = async (collection, doc, data, purpose) => {
  const storage = database.collection(collection).doc(doc);
  const snapshot = await storage.get();
  if (snapshot.exists) {
    if (purpose === "dropzone") {
      if (window.confirm("Are you sure you wish to update this item?")) {
        delete data.timestamp;
        delete data.client;
        delete data.device;
        delete data.tags;
        storage.update(data);
      }
    } else {
      delete data.timestamp;
      storage.update(data);
    }
  } else {
    await database
      .collection(collection)
      .doc(doc)
      .set(data);
  }
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
