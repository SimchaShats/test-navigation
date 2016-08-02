"use strict";
import {CHANGE_ROOT, FETCH_REMOTE_DATA} from './actionTypes';
import APIFactory from "../../api/APIFactory";

export function appInitialized() {
  return async function (dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('main'));
  };
}

export function changeAppRoot(root) {
  return {type: CHANGE_ROOT, payload: root};
}

export function fetchRemoteData(data) {
  return {type: FETCH_REMOTE_DATA, payload: data};
}