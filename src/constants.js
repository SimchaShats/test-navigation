/**
 * Created by Simcha on 7/27/16.
 */
"use strict";

import {
  Platform
} from 'react-native';

export const API_SOURCES = {
  "FIREBASE": "FIREBASE",
  "ASYNC_STORAGE": "ASYNC_STORAGE"
};

export const FIREBASE = {
  API_KEY: "AIzaSyASS6LMmodhPlmkbLIKn0Udth9fcoYXO8E",
  AUTH_DOMAIN: "measures-1b8d8.firebaseapp.com",
  DATABASE_URL: "https://measures-1b8d8.firebaseio.com",
  STORAGE_BUCKET: "measures-1b8d8.appspot.com"
};

export const ASYNC_STORAGE = {
  MY_NOTES: "MY_NOTES"
};

export const UI = {
  STATUS_BAR_HEIGHT: Platform.OS === "ios" ? 20 : 0,
  IOS: {
    STATUS_BAR_HEIGHT: 20
  }
};

