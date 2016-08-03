"use strict";
import {
  SIGN_OUT_SUCCESS,
  SIGN_IN_SUCCESS
} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';

const initialState = Map({
  isLoggedIn: false,
  profile: null
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return state.set("isLoggedIn", true)
        .set("profile", fromJS(action.payload));
    case SIGN_OUT_SUCCESS:
      return state.set("isLoggedIn", false)
        .set("profile", null);
    default:
      return state;
  }
}
