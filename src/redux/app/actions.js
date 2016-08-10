"use strict";
import {
  CHANGE_ROOT,
  FETCH_REMOTE_DATA,
  CHANGE_FORM_FIELD,
  CHANGE_KEYBOARD_STATE,
  FOCUS_ELEMENT,
  SET_FORM_FIELD,
  CHANGE_LANGUAGE
} from './actionTypes';
import APIFactory from "../../api/APIFactory";
import {API_SOURCES} from "../../constants";
import * as userActions from "../user/actions";
import {ASYNC_STORAGE} from "../../constants";
import I18n from "../../i18n";

export function appInitialized() {
  return async function (dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('main'));
    dispatch(getLanguage());
    const userProfile = await APIFactory(API_SOURCES.ASYNC_STORAGE).getUserProfile();
    userProfile && dispatch(userActions.signIn(userProfile.email, userProfile.password));
  };
}

export function changeAppRoot(root) {
  return {type: CHANGE_ROOT, payload: root};
}

export function fetchRemoteData(data) {
  return {type: FETCH_REMOTE_DATA, payload: data};
}

export function focusElement(element) {
  return {type: FOCUS_ELEMENT, payload: element || null};
}

export function changeKeyboardState() {
  return {type: CHANGE_KEYBOARD_STATE};
}

export function changeLanguage(lang, isPermanentSave = true) {
  return async function(dispatch, getState) {
    dispatch({type: CHANGE_LANGUAGE, payload: lang || "en"});
    dispatch(setFormField("userProfile", "lang", lang || "en"));
    I18n.locale = lang;
    isPermanentSave && await APIFactory(API_SOURCES.ASYNC_STORAGE).setLanguage(lang);
    return null;
  }
}

export function getLanguage() {
  return async function(dispatch, getState) {
    const lang = await APIFactory(API_SOURCES.ASYNC_STORAGE).getLanguage();
    dispatch(changeLanguage(lang, false));
    return null;
  }
}

export function changeFormField(form, field, value) {
  return {type: CHANGE_FORM_FIELD, payload: {form, field, value}};
}

export function setFormField(form, field, data) {
  return {type: SET_FORM_FIELD, payload: {form, field, data}};
}
