/**
 * Created by Simcha on 7/27/16.
 */
"use strict";

import * as firebase from 'firebase';
import {FIREBASE} from "../constants";
import API from "./API";
import store from "../redux";
import * as appActions from "../redux/app/actions";
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

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
      } else {
        // User is signed out.
      }
    });
  }

  login() {
    firebase.auth().signInAnonymously().catch((error) => {
      store.dispatch(appActions.loginFailure());
    });
  }

  getMeasuresTheoryList(){
    return new Promise ((resolve, reject) => {
      firebase.database().ref('theory/en').limitToLast(10).on('value', (snapshot) => {
        resolve(OrderedMap(snapshot.val()).reverse().toObject());
      }, (r) => {reject(r)});
    })
  }

  getMeasuresNamesList(){
    return new Promise ((resolve, reject) => {
      firebase.database().ref('names/en').on('value', (snapshot) => {
        resolve(snapshot.val());
      }, (r) => {reject(r)});
    })
  }
}