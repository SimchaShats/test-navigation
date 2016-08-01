"use strict";
import {
  GET_THEORY_LIST,
  GET_NAMES_LIST,
  GET_MY_NOTES_LIST,
  ADD_MY_NOTE
} from './actionTypes';
import {OrderedMap, Map} from 'immutable';

const initialState = Map({
  namesList: OrderedMap(),
  theoryList: OrderedMap(),
  myNotesList: OrderedMap()
});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case GET_THEORY_LIST:
      return state.mergeDeepIn(["theoryList"], action.theoryList);
    case GET_MY_NOTES_LIST:
      return state.mergeDeepIn(["myNotesList"], action.myNotesList);
    case GET_NAMES_LIST:
      return state.mergeDeepIn(["namesList"], action.namesList);
    case ADD_MY_NOTE:
      //return state.merge({namesList: action.namesList}, {deep: true});
    default:
      return state;
  }
}
