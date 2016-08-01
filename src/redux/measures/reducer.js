"use strict";
import {
  GET_THEORY_LIST,
  GET_NAMES_LIST,
  GET_MY_NOTES_LIST,
  ADD_MY_NOTE,
  REMOVE_MY_NOTE
} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';

const initialState = Map({
  namesList: OrderedMap(),
  theoryList: OrderedMap(),
  myNotesList: OrderedMap()
});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case GET_THEORY_LIST:
      return state.mergeDeepIn(["theoryList"], fromJS(action.theoryList).toOrderedMap().map((value, key) => value.set("id", key)));
    case GET_MY_NOTES_LIST:
      return state.mergeDeepIn(["myNotesList"], fromJS(action.myNotesList).toOrderedMap().map((value, key) => value.set("id", key)));
    case GET_NAMES_LIST:
      return state.mergeDeepIn(["namesList"], action.namesList);
    case ADD_MY_NOTE:
      return state.set("myNotesList", fromJS(action.newNote).toOrderedMap().map((value, key) => value.set("id", key)).mergeDeep(state.get("myNotesList")));
    case REMOVE_MY_NOTE:
      return state.deleteIn(["myNotesList", action.noteId]);
    default:
      return state;
  }
}
