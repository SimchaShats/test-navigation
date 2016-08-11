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

  getMeasuresNamesList(lang) {
    return new Promise((resolve, reject) => {
      const measuresNames = require("../local/measuresNames");
      resolve(measuresNames[lang]);
    })
  }
}