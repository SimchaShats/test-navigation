/**
 * Created by Simcha on 7/27/16.
 */
"use strict";

import * as firebase from 'firebase';
import {FIREBASE} from "../constants";
import API from "./API";
import store from "../redux";
import * as userActions from "../redux/user/actions";
import {OrderedMap, Map} from 'immutable';

let instance = null;
export default class extends API {
  constructor() {
    super();

    if (instance) {
      return instance;
    } else {
      instance = this;
    }

    const firebaseConfig = {
      apiKey: FIREBASE.API_KEY,
      authDomain: FIREBASE.AUTH_DOMAIN,
      databaseURL: FIREBASE.DATABASE_URL,
      storageBucket: FIREBASE.STORAGE_BUCKET
    };

    firebase.initializeApp(firebaseConfig);

    //firebase.auth().onAuthStateChanged((user) => {
    //  if (user) {
    //    // User is signed in.
    //    console.log(user)
    //    store.dispatch(userActions.signInSuccess(user));
    //  } else {
    //    // User is signed out.
    //  }
    //});
  }

  signIn(email, password) {
    return new Promise ((resolve, reject) => {
      let user = {};
      firebase.auth().signInWithEmailAndPassword(email, password).then((snapshot) => {
        user.id = snapshot.uid;
        user.email = snapshot.email;
        return firebase.database().ref(`users/${snapshot.uid}`).once("value", (snapshot) => {
          user.password = password;
          user.firstName = snapshot.val().firstName;
          user.lastName = snapshot.val().lastName;
          resolve(user);
        }, (error) => {reject(error)})
      }).catch((error) => {
        reject(error);
      });
    })
  }

  signUp(email, password, firstName, lastName) {
    return new Promise ((resolve, reject) => {
      let user = {};
      firebase.auth().createUserWithEmailAndPassword(email, password).then((snapshot) => {
        user.id = snapshot.uid;
        user.email = email;
        return firebase.database().ref(`users/${snapshot.uid}`).set({
          email,
          firstName,
          lastName
        });
      }).then(() => {
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  signOut() {
    return new Promise ((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve(null);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  getMeasuresTheoryList(){
    return new Promise ((resolve, reject) => {
      firebase.database().ref('theory/en').limitToLast(100).on('value', (snapshot) => {
        resolve(OrderedMap(snapshot.val()).reverse().toObject());
      }, (r) => {reject(r)});
    })
  }

  getFriendsNotesList(userId){
    return new Promise ((resolve, reject) => {
      firebase.database().ref(`friendsNotes/${userId}`).limitToLast(100).once('value', (snapshot) => {
        resolve(OrderedMap(snapshot.val()).reverse().toObject());
      }, (error) => {reject(error)});
    })
  }

  removeFriendNote(userId, noteId){
    return new Promise ((resolve, reject) => {
      firebase.database().ref(`friendsNotes/${userId}/${noteId}`).remove(() => {
        resolve(null);
      });
    })
  }

  getMeasuresNamesList(){
    return new Promise ((resolve, reject) => {
      firebase.database().ref('measuresNames/en').once('value', (snapshot) => {
        resolve(snapshot.val());
      }, (error) => {reject(error)});
    })
  }
}