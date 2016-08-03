/**
 * Created by Simcha on 7/27/16.
 */
"use strict";

import API from "./API";
import store from "../redux";
import * as appActions from "../redux/app/actions";
import {
  AsyncStorage
} from 'react-native';
import {ASYNC_STORAGE} from "../constants";
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
  }

  addMyNote(measure, data) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(ASYNC_STORAGE.MY_NOTES, (error, notes) => {
        notes = JSON.parse(notes) || {};
        const key = `_${Date.now()}`;
        notes[key] = {measure, data};
        AsyncStorage.setItem(ASYNC_STORAGE.MY_NOTES, JSON.stringify(notes), () => {
          let newNote = {};
          newNote[key] = {measure, data};
          resolve(newNote);
        });
      });
    })
  }

  removeMyNote(noteId) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(ASYNC_STORAGE.MY_NOTES, (error, notes) => {
        notes = JSON.parse(notes) || {};
        delete notes[noteId];
        AsyncStorage.setItem(ASYNC_STORAGE.MY_NOTES, JSON.stringify(notes), () => {
          resolve(noteId);
        });
      });
    })
  }

  getMeasuresMyNotesList() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(ASYNC_STORAGE.MY_NOTES, (error, notes) => {
        resolve(OrderedMap(JSON.parse(notes || "{}")).reverse().toObject());
      });
    })
  }

  saveUserProfile(userProfile) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem(ASYNC_STORAGE.USER_PROFILE, JSON.stringify(userProfile), () => {
        resolve(null);
      });
    })
  }

  removeUserProfile(userProfile) {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(ASYNC_STORAGE.USER_PROFILE, () => {
        resolve(null);
      });
    })
  }

  getUserProfile() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(ASYNC_STORAGE.USER_PROFILE, (error, userProfile) => {
        resolve(JSON.parse(userProfile));
      });
    })
  }
}