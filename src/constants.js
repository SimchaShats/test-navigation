/**
 * Created by Simcha on 7/27/16.
 */
"use strict";

import {
  Platform
} from 'react-native';
import Dimensions from "Dimensions";
var {height, width} = Dimensions.get('window');

export const API_SOURCES = {
  "FIREBASE": "FIREBASE",
  "LOCAL": "LOCAL",
  "ASYNC_STORAGE": "ASYNC_STORAGE"
};

export const FIREBASE = {
  API_KEY: "AIzaSyDocGGhSlex8lFpW4k3FZeauHkpw8yD9EI",
  AUTH_DOMAIN: "measuresproject.firebaseapp.com",
  DATABASE_URL: "https://measuresproject.firebaseio.com",
  STORAGE_BUCKET: "measuresproject.appspot.com"
};

export const ASYNC_STORAGE = {
  MY_NOTES: "MY_NOTES",
  LANGUAGE: "LANGUAGE",
  CURRENT_MEASURE: "CURRENT_MEASURE",
  USER_PROFILE: "USER_PROFILE"
};

export const CODE_PUSH = {
  ANDROID: {
    PRODUCTION: "7LA9NVCayTubrNTaO7fj9zAtODcFVyyiZVSGb",
    STAGING: "J2ji8ts17_JjrYgE82fhUpz3rZaRVyyiZVSGb"
  },
  IOS: {
    PRODUCTION: "aTDBdIsrZAPVqaxKdkdp1GiQIk0uVyyiZVSGb",
    STAGING: "p3I26VbhB2B4LV4VHjVMlpcmWdeHVyyiZVSGb"
  }
};

export const LANGUAGES = {
  en: "English",
  ru: "Русский",
  he: "עברית"
};

export const UI = {
  STATUS_BAR_HEIGHT: Platform.OS === "ios" ? 20 : 0,
  IOS: {
    STATUS_BAR_HEIGHT: 20
  },
  INITIAL_SIZES: {
    DEVICE_HEIGHT: height,
    DEVICE_WIDTH: width
  }
};

