import {CHANGE_ROOT, LOGIN, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from './actionTypes';
import APIFactory from "../../api/APIFactory";

export function appInitialized() {
  return async function (dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('main'));
  };
}

export function login() {
  return async function (dispatch, getState) {
    dispatch(loginRequest());
    await APIFactory().login();
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess() {
  return async function (dispatch, getState) {
    dispatch({type: LOGIN_SUCCESS});
  }
}

export function loginFailure(error) {
  return async function (dispatch, getState) {
    dispatch({type: LOGIN_FAILURE});
    alert(error);
  }
}

export function changeAppRoot(root) {
  return {type: CHANGE_ROOT, root: root};
}