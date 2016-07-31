"use strict";
import {GET_THEORY_LIST, GET_NAMES_LIST, ADD_MY_NOTE, GET_MY_NOTES_LIST} from './actionTypes';
import {API_SOURCES} from "../../constants";
import APIFactory from "../../api/APIFactory";

export function getMeasuresTheoryList() {
  return async function(dispatch, getState) {
    const theoryList = await APIFactory().getMeasuresTheoryList();
    dispatch({type: GET_THEORY_LIST, theoryList});
    return true;
  }
}

export function getMeasuresNamesList() {
  return async function(dispatch, getState) {
    const namesList = await APIFactory().getMeasuresNamesList();
    dispatch({type: GET_NAMES_LIST, namesList});
    return true;
  }
}

export function addMyNote(note) {
  return async function(dispatch, getState) {
    await APIFactory(API_SOURCES.ASYNC_STORAGE).addMyNote(note);
    dispatch({type: ADD_MY_NOTE});
    return true;
  }
}

export function getMeasuresMyNotesList() {
  return async function(dispatch, getState) {
    const  myNotesList = await APIFactory(API_SOURCES.ASYNC_STORAGE).getMeasuresMyNotesList();
    dispatch({type: GET_MY_NOTES_LIST, myNotesList});
    return true;
  }
}
