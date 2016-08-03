import {
  CHANGE_ROOT,
  FETCH_REMOTE_DATA,
  CHANGE_FORM_FIELD,
  SET_FORM_FIELD_ERROR
} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';
import fieldValidation from '../../fieldValidation';
import formValidation from '../../formValidation';

const initialState = Map({
  root: null,
  isFetching: Map({
    user: false
  }),
  forms: Map({
    login: Map({
      isValid: false,
      message: "",
      email: "",
      emailError: null,
      password: "",
      passwordError: null
    }),
    register: Map({
      isValid: true,
      message: "",
      email: "mr.shats@gmail.com",
      emailError: null,
      firstName: "Simcha",
      firstNameError: null,
      lastName: "Shats",
      lastNameError: null,
      password: "123456",
      passwordError: null,
      confirmPassword: "123456",
      passwordAgainError: null
    })
  })
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_ROOT:
      return state.set("root", action.payload);
    case CHANGE_FORM_FIELD:
      return formValidation(
        fieldValidation(
          state.setIn(["forms", action.payload.form, action.payload.field], action.payload.value),
          action),
        action
      );
    case SET_FORM_FIELD_ERROR:
      return formValidation(
        state.setIn(["forms", action.payload.form, action.payload.errorField], action.payload.error),
        action
      );
    case FETCH_REMOTE_DATA:
      return state.mergeDeepIn(["isFetching"], action.payload);
    default:
      return state;
  }
}
