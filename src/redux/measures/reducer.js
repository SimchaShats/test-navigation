"use strict";
import {
  GET_THEORY_LIST, GET_NAMES_LIST, GET_MY_NOTES_LIST
} from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  namesList: null,
  theoryList: null,
  myNotesList: null
});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case GET_THEORY_LIST:
      return state.merge({theoryList: action.theoryList}, {deep: true});
    case GET_MY_NOTES_LIST:
      return state.merge({myNotesList: action.myNotesList}, {deep: true});
    case GET_NAMES_LIST:
      return state.merge({namesList: action.namesList}, {deep: true});
    default:
      return state;
  }
}
