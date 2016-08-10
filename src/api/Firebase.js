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
    return new Promise((resolve, reject) => {
      let user = {};
      firebase.auth().signInWithEmailAndPassword(email, password).then(snapshot => {
        user.id = snapshot.uid;
        user.email = snapshot.email;
        return firebase.database().ref(`users/${snapshot.uid}`).once("value", snapshot => {
          user.password = password;
          user.firstName = snapshot.val().firstName;
          user.lastName = snapshot.val().lastName;
          resolve(user);
        }, (error) => {
          reject(error)
        })
      }).catch((error) => {
        reject(error);
      });
    })
  }

  signUp(email, password, firstName, lastName, birthDate) {
    return new Promise((resolve, reject) => {
      let user = {};
      firebase.auth().createUserWithEmailAndPassword(email, password).then(snapshot => {
        user.id = snapshot.uid;
        user.email = email;
        alert(birthDate);
        return firebase.database().ref(`users/${snapshot.uid}`).set({
          email,
          firstName,
          lastName,
          birthDate: birthDate.getTime()
        });
      }).then(() => {
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        user.birthDate = birthDate;
        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  signOut() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve(null);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  getUsersList() {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`users`).once('value', snapshot => {
        resolve(snapshot.val());
      }, error => reject(error));
    })
  }

  getMeasuresTheoryList() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('theory/en').once('value', snapshot => {
        resolve(OrderedMap(snapshot.val()).reverse().toObject());
      }, error => reject(error));
    })
  }

  getFriendsNotesList(userId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`friendsNotes/${userId}`).once('value', snapshot => {
        console.log(snapshot.val(), userId);
        resolve(OrderedMap(snapshot.val()).reverse().toObject());
      }, (error) => {
        reject(error)
      });
    })
  }

  addNoteToFriend(userId, measure, message, from) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`friendsNotes/${userId}`).push({measure, message, from}, (error) => {
        error ? reject(error) : resolve(null);
      });
    })
  }

  removeFriendNote(userId, noteId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(`friendsNotes/${userId}/${noteId}`).remove(() => {
        resolve(null);
      });
    })
  }

  getMeasuresNamesList() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('measuresNames/en').once('value', snapshot => {
        resolve(snapshot.val());
      }, (error) => {
        reject(error)
      });
    })
  }
}