import {
  CHANGE_ROOT,
  FETCH_REMOTE_DATA,
  CHANGE_FORM_FIELD,
  CHANGE_LANGUAGE,
  CHANGE_KEYBOARD_STATE,
  FOCUS_ELEMENT,
  SET_FORM_FIELD
} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';
import fieldValidation from '../../fieldValidation';
import formValidation from '../../formValidation';

const initialState = Map({
  root: null,
  focusedElement: null,
  isKeyboardShown: false,
  isFetching: Map({
    friendNote: false,
    user: false
  }),
  lang: null,
  forms: Map({
    login: Map({
      isValid: true,
      message: "",
      email: "",
      emailError: null,
      password: "",
      passwordError: null
    }),
    userProfile: Map({
      isValid: true,
      lang: "en",
      message: "",
      email: "asdf@sdfg.asd",
      emailError: null,
      firstName: "sadfa",
      firstNameError: null,
      lastName: "asdf",
      lastNameError: null,
      password: "123123",
      passwordError: null,
      confirmPassword: "123123",
      passwordAgainError: null,
      birthDate: new Date(),
      birthDateError: null
    })
  })
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_ROOT:
      return state.set("root", action.payload);
    case CHANGE_LANGUAGE:
      return state.set("lang", action.payload);
    case FOCUS_ELEMENT:
      return state.set("focusedElement", action.payload);
    case CHANGE_KEYBOARD_STATE:
      return state.set("isKeyboardShown", !state.get("isKeyboardShown"));
    case CHANGE_FORM_FIELD:
      return formValidation(
        fieldValidation(
          state.setIn(["forms", action.payload.form, action.payload.field], action.payload.value),
          action),
        action
      );
    case SET_FORM_FIELD:
      return formValidation(
        state.setIn(["forms", action.payload.form, action.payload.field], action.payload.data),
        action
      );
    case FETCH_REMOTE_DATA:
      return state.mergeDeepIn(["isFetching"], action.payload);
    default:
      return state;
  }
}
