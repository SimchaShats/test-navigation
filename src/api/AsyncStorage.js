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

  addMyNote(note) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(ASYNC_STORAGE.MY_NOTES, (error, notes) => {
        notes = JSON.parse(notes) || {};
        notes[`_${Date.now()}`] = note;
        AsyncStorage.setItem(ASYNC_STORAGE.MY_NOTES, JSON.stringify(notes), () => {
          resolve(true);
        });
      });
    })
  }

  getMeasuresMyNotesList() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(ASYNC_STORAGE.MY_NOTES, (error, notes) => {
        resolve(JSON.parse(notes));
      });
    })
  }
}