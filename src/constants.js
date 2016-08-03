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
  API_KEY: "AIzaSyDocGGhSlex8lFpW4k3FZeauHkpw8yD9EI",
  AUTH_DOMAIN: "measuresproject.firebaseapp.com",
  DATABASE_URL: "https://measuresproject.firebaseio.com",
  STORAGE_BUCKET: "measuresproject.appspot.com"
};

export const ASYNC_STORAGE = {
  MY_NOTES: "MY_NOTES",
  USER_PROFILE: "USER_PROFILE"
};

export const UI = {
  STATUS_BAR_HEIGHT: Platform.OS === "ios" ? 20 : 0,
  IOS: {
    STATUS_BAR_HEIGHT: 20
  }
};

