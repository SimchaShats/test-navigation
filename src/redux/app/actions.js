"use strict";
import {
  CHANGE_ROOT,
  FETCH_REMOTE_DATA,
  CHANGE_FORM_FIELD,
  CHANGE_KEYBOARD_STATE,
  FOCUS_ELEMENT,
  SET_FORM_FIELD,
  SYNC_CODE_PUSH,
  CHANGE_LANGUAGE,
  UPDATE_CODE_PUSH
} from './actionTypes';
import APIFactory from "../../api/APIFactory";
import {API_SOURCES} from "../../constants";
import * as userActions from "../user/actions";
import * as measuresActions from "../measures/actions";
import {ASYNC_STORAGE} from "../../constants";
import CodePush from "react-native-code-push";
import I18n from "../../utils/i18n";

export function appInitialized() {
  return async function (dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('main'));
    dispatch(getLanguage());
    dispatch(measuresActions.getCurrentMeasure());
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

export function changeKeyboardState(state) {
  return {type: CHANGE_KEYBOARD_STATE, payload: state};
}

export function changeLanguage(lang, isPermanentSave = false) {
  return async function (dispatch, getState) {
    I18n.locale = lang;
    dispatch({type: CHANGE_LANGUAGE, payload: lang});
    dispatch(setFormField("userProfile", "lang", lang));
    dispatch(setFormField("register", "lang", lang));
    dispatch(measuresActions.getMeasuresNamesList());
    dispatch(measuresActions.getMeasuresTheoryList());
    isPermanentSave && await APIFactory(API_SOURCES.ASYNC_STORAGE).setLanguage(lang);
    return null;
  }
}

export function getLanguage() {
  return async function (dispatch, getState) {
    const lang = await APIFactory(API_SOURCES.ASYNC_STORAGE).getLanguage() || I18n.locale;
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

export function updateCodePush(form, field, data) {
  return {type: UPDATE_CODE_PUSH, payload: {form, field, data}};
}

export function syncCodePush(syncStatus) {
  let syncMessage = "";
  switch (syncStatus) {
    case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
      syncMessage = "Checking for update.";
      break;
    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
      syncMessage = "Downloading package.";
      break;
    case CodePush.SyncStatus.AWAITING_USER_ACTION:
      syncMessage = "Awaiting user action.";
      break;
    case CodePush.SyncStatus.INSTALLING_UPDATE:
      syncMessage = "Installing update.";
      break;
    case CodePush.SyncStatus.UP_TO_DATE:
      syncMessage = "App up to date.";
      break;
    case CodePush.SyncStatus.UPDATE_IGNORED:
      syncMessage = "Update cancelled by user.";
      break;
    case CodePush.SyncStatus.UPDATE_INSTALLED:
      syncMessage = "Update installed.";
      break;
    case CodePush.SyncStatus.UNKNOWN_ERROR:
      syncMessage = "An unknown error occurred.";
      break;
  }
  return {type: SYNC_CODE_PUSH, payload: syncMessage};
}
