"use strict";
import {
  CHANGE_ROOT,
  FETCH_REMOTE_DATA,
  CHANGE_FORM_FIELD,
  SET_FORM_FIELD_ERROR
} from './actionTypes';
import APIFactory from "../../api/APIFactory";
import {API_SOURCES} from "../../constants";
import * as userActions from "../user/actions";
import {ASYNC_STORAGE} from "../../constants";

export function appInitialized() {
  return async function (dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('main'));
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

export function changeFormField(form, field, value) {
  return {type: CHANGE_FORM_FIELD, payload: {form, field, value}};
}

export function setFormFieldError(form, errorField, error) {
  return {type: SET_FORM_FIELD_ERROR, payload: {form, errorField, error}};
}
