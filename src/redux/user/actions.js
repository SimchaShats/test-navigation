"use strict";
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE,
  GET_USERS_LIST
} from './actionTypes';
import APIFactory from "../../api/APIFactory";
import * as appActions from "../app/actions";
import * as measuresActions from "../measures/actions";
import {ASYNC_STORAGE} from "../../constants";
import {API_SOURCES} from "../../constants";

export function signIn(email, password) {
  return async function (dispatch, getState) {
    dispatch(appActions.fetchRemoteData({user: true}));
    try {
      const profile = await APIFactory().signIn(email, password);
      dispatch(signInSuccess(profile));
    } catch (error) {
      dispatch(signInFailure(error));
    }
    dispatch(appActions.fetchRemoteData({user: false}));
    return null;
  }
}

export function signUp(email, password, firstName, lastName, birthDate) {
  return async function (dispatch, getState) {
    dispatch(appActions.fetchRemoteData({user: true}));
    try {
      const userProfile = await APIFactory().signUp(email, password, firstName, lastName, birthDate);
      dispatch(signUpSuccess(userProfile));
    } catch (error) {
      dispatch(signUpFailure(error));
    }
    dispatch(appActions.fetchRemoteData({user: false}));
    return null;
  }
}

export function signOut() {
  return async function (dispatch, getState) {
    dispatch(appActions.fetchRemoteData({user: true}));
    try {
      let x = await APIFactory().signOut();
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailure(error));
    }
    dispatch(appActions.fetchRemoteData({user: false}));
    return null;
  }
}

export function signInSuccess(userProfile) {
  return async function (dispatch, getState) {
    await APIFactory(API_SOURCES.ASYNC_STORAGE).saveUserProfile(userProfile);
    userProfile.date = new Date(userProfile.date);
    dispatch({type: SIGN_IN_SUCCESS, payload: userProfile});
    dispatch(measuresActions.getFriendsNotesList(userProfile.id));
    dispatch(getUsersList());
    return null;
  }
}

export function signUpSuccess(userProfile) {
  return async function (dispatch, getState) {
    dispatch({type: SIGN_UP_SUCCESS});
    dispatch(signInSuccess(userProfile));
    return null;
  }
}

export function signOutSuccess() {
  return async function (dispatch, getState) {
    await APIFactory(API_SOURCES.ASYNC_STORAGE).removeUserProfile();
    dispatch({type: SIGN_OUT_SUCCESS});
    return null;
  }
}

export function getUsersList() {
  return async function (dispatch, getState) {
    const usersList = await APIFactory().getUsersList();
    dispatch({type: GET_USERS_LIST, payload: usersList});
    return null;
  }
}

export function addNoteToFriend(userId, measure, message, from) {
  return async function (dispatch, getState) {
    dispatch(appActions.fetchRemoteData({friendNote: true}));
    await APIFactory().addNoteToFriend(userId, measure, message, from);
    dispatch({type: ADD_NOTE_TO_FRIEND});
    dispatch(appActions.fetchRemoteData({friendNote: false}));
    return null;
  }
}

export function signInFailure(error) {
  return async function (dispatch, getState) {
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/user-not-found":
      case "auth/user-disabled":
        dispatch(appActions.setFormFieldError("login", "emailError", error.message));
        break;
      case "auth/wrong-password":
        dispatch(appActions.setFormFieldError("login", "passwordError", error.message));
        break;
      default:
        dispatch(appActions.setFormFieldError("login", "message", error.message));
    }
    dispatch({type: SIGN_IN_FAILURE});
    return null;
  }
}

export function signUpFailure(error) {
  return async function (dispatch, getState) {
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/email-already-in-use":
        dispatch(appActions.setFormField("userProfile", "emailError", error.message));
        break;
      case "auth/weak-password":
        dispatch(appActions.setFormField("userProfile", "passwordError", error.message));
        break;
      case "auth/operation-not-allowed":
        dispatch(appActions.setFormField("userProfile", "message", error.message));
        break;
      default:
        dispatch(appActions.setFormField("userProfile", "message", error.message));
    }
    dispatch({type: SIGN_IN_FAILURE});
    return null;
  }
}

export function signOutFailure(error) {
  return {type: SIGN_OUT_FAILURE};
}