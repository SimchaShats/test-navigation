"use strict";
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE} from './actionTypes';
import APIFactory from "../../api/APIFactory";
import * as appActions from "../app/actions";

export function signIn(email, password) {
  return async function (dispatch, getState) {
    dispatch(appActions.fetchRemoteData({user: true}));
    try {
      const user = await APIFactory().signIn(email, password);
      dispatch(signInSuccess(user));
    } catch(error) {
      dispatch(signInFailure(error));
    }
    dispatch(appActions.fetchRemoteData({user: false}));
    return true;
  }
}

export function signInSuccess(user) {
  return async function (dispatch, getState) {
    dispatch({type: LOGIN_SUCCESS, payload: user});
    return true;
  }
}

export function signInFailure(error) {
  return async function (dispatch, getState) {
    dispatch({type: LOGIN_FAILURE});
    return true;
  }
}