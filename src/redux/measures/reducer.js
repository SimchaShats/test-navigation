"use strict";
import {
  GET_THEORY_LIST,
  GET_NAMES_LIST,
  GET_MY_NOTES_LIST,
  ADD_MY_NOTE,
  REMOVE_MY_NOTE,
  REMOVE_FRIEND_NOTE,
  GET_FRIENDS_NOTES_LIST,
  CHANGE_CURRENT_MEASURE
} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';

const initialState = Map({
  namesList: OrderedMap(),
  theoryList: OrderedMap(),
  friendsNotesList: OrderedMap(),
  myNotesList: OrderedMap(),
  currentMeasure: "all"
});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case GET_THEORY_LIST:
      return state.setIn(["theoryList"], fromJS(action.payload).toOrderedMap().map((value, key) => value.set("id", key)));
    case GET_MY_NOTES_LIST:
      return state.setIn(["myNotesList"], fromJS(action.payload).toOrderedMap().map((value, key) => value.set("id", key)));
    case GET_FRIENDS_NOTES_LIST:
      return state.setIn(["friendsNotesList"], fromJS(action.payload).toOrderedMap().map((value, key) => value.set("id", key)));
    case GET_NAMES_LIST:
      return state.setIn(["namesList"], fromJS(action.payload).toOrderedMap().sort());
    case ADD_MY_NOTE:
      return state.set("myNotesList", fromJS(action.payload).toOrderedMap().map((value, key) => value.set("id", key)).mergeDeep(state.get("myNotesList")));
    case REMOVE_FRIEND_NOTE:
      return state.deleteIn(["friendsNotesList", action.payload]);
    case REMOVE_MY_NOTE:
      return state.deleteIn(["myNotesList", action.payload]);
    case CHANGE_CURRENT_MEASURE:
      return state.set("currentMeasure", action.payload);
    default:
      return state;
  }
}
