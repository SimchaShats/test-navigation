"use strict";
import {GET_THEORY_LIST, GET_NAMES_LIST, ADD_MY_NOTE, GET_MY_NOTES_LIST, REMOVE_MY_NOTE} from './actionTypes';
import {API_SOURCES} from "../../constants";
import APIFactory from "../../api/APIFactory";

export function getMeasuresTheoryList() {
  return async function(dispatch, getState) {
    const theoryList = await APIFactory().getMeasuresTheoryList();
    dispatch({type: GET_THEORY_LIST, payload: theoryList});
    return true;
  }
}

export function getMeasuresNamesList() {
  return async function(dispatch, getState) {
    const namesList = await APIFactory().getMeasuresNamesList();
    dispatch({type: GET_NAMES_LIST, payload: namesList});
    return true;
  }
}

export function addMyNote(measure, data) {
  return async function(dispatch, getState) {
    const newNote = await APIFactory(API_SOURCES.ASYNC_STORAGE).addMyNote(measure, data);
    dispatch({type: ADD_MY_NOTE, payload: newNote});
    return true;
  }
}

export function removeMyNote(noteId) {
  return async function(dispatch, getState) {
    await APIFactory(API_SOURCES.ASYNC_STORAGE).removeMyNote(noteId);
    dispatch({type: REMOVE_MY_NOTE, payload: noteId});
    return true;
  }
}

export function getMeasuresMyNotesList() {
  return async function(dispatch, getState) {
    const myNotesList = await APIFactory(API_SOURCES.ASYNC_STORAGE).getMeasuresMyNotesList();
    dispatch({type: GET_MY_NOTES_LIST, payload: myNotesList});
    return true;
  }
}
