"use strict";
import {LOGIN_SUCCESS} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';

const initialState = Map({
  isLoggedIn: false,
  profile: null
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set("isLoggedIn", true)
        .set("profile", action.payload);
    default:
      return state;
  }
}
