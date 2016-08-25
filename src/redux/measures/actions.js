"use strict";
import {
  GET_THEORY_LIST,
  GET_NAMES_LIST,
  ADD_MY_NOTE,
  GET_MY_NOTES_LIST,
  REMOVE_MY_NOTE,
  GET_FRIENDS_NOTES_LIST,
  CHANGE_CURRENT_MEASURE,
  REMOVE_FRIEND_NOTE
} from './actionTypes';
import {API_SOURCES} from "../../constants";
import APIFactory from "../../api/APIFactory";

export function getMeasuresTheoryList() {
  return async function(dispatch, getState) {
    const theoryList = await APIFactory().getMeasuresTheoryList(getState().app.get("lang"));
    dispatch({type: GET_THEORY_LIST, payload: theoryList});
    return null;
  }
}

export function getMeasuresNamesList() {
  return async function(dispatch, getState) {
    const namesList = await APIFactory(API_SOURCES.LOCAL).getMeasuresNamesList(getState().app.get("lang"));
    dispatch({type: GET_NAMES_LIST, payload: namesList});
    return null;
  }
}

export function getFriendsNotesList(userId) {
  return async function(dispatch, getState) {
    const friendsNotesList = await APIFactory().getFriendsNotesList(userId);
    dispatch({type: GET_FRIENDS_NOTES_LIST, payload: friendsNotesList});
    return null;
  }
}

export function addMyNote(measure, message) {
  return async function(dispatch, getState) {
    const newNote = await APIFactory(API_SOURCES.ASYNC_STORAGE).addMyNote(measure, message);
    dispatch({type: ADD_MY_NOTE, payload: newNote});
    return null;
  }
}

export function removeMyNote(noteId) {
  return async function(dispatch, getState) {
    await APIFactory(API_SOURCES.ASYNC_STORAGE).removeMyNote(noteId);
    dispatch({type: REMOVE_MY_NOTE, payload: noteId});
    return null;
  }
}

export function changeCurrentMeasure(currentMeasure, isPermanentSave = false) {
  return async function(dispatch, getState) {
    isPermanentSave && await APIFactory(API_SOURCES.ASYNC_STORAGE).saveCurrentMeasure(currentMeasure);
    dispatch({type: CHANGE_CURRENT_MEASURE, payload: currentMeasure});
    return null;
  }
}

export function getCurrentMeasure() {
  return async function(dispatch, getState) {
    const currentMeasure = await APIFactory(API_SOURCES.ASYNC_STORAGE).getCurrentMeasure(currentMeasure) || "all";
    dispatch(changeCurrentMeasure(currentMeasure, false));
    return null;
  }
}

export function removeFriendNote(noteId) {
  return async function(dispatch, getState) {
    await APIFactory().removeFriendNote(getState().user.get("profile").get("id"), noteId);
    dispatch({type: REMOVE_FRIEND_NOTE, payload: noteId});
    return null;
  }
}

export function getMeasuresMyNotesList() {
  return async function(dispatch, getState) {
    const myNotesList = await APIFactory(API_SOURCES.ASYNC_STORAGE).getMeasuresMyNotesList();
    dispatch({type: GET_MY_NOTES_LIST, payload: myNotesList});
    return null;
  }
}
