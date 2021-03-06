"use strict";
import {
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  GET_USERS_LIST
} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';

const initialState = Map({
  isLoggedIn: false,
  profile: null,
  usersList: OrderedMap({})
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return state.set("isLoggedIn", true)
        .set("profile", fromJS(action.payload));
    case SIGN_OUT_SUCCESS:
      return state.set("isLoggedIn", false)
        .set("profile", null);
    case GET_USERS_LIST:
      return state.mergeDeepIn(["usersList"], fromJS(action.payload).toOrderedMap().map((value, key) => value.set("id", key).set("birthDate", new Date(value.get("birthDate")))));
    default:
      return state;
  }
}
