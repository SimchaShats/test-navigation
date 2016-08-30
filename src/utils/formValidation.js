'use strict';
import {} from "./../redux/app/actionTypes";

export default function (state, action) {
  const form = state.get("forms").get(action.payload.form);
  switch(action.payload.form) {
    case "login" :
      if (form.get("emailError") === "" && form.get("email") !== "" && form.get("passwordError") === "" && form.get("password") !== "") {
        return state.setIn(["forms", action.payload.form, "isValid"], true);
      } else {
        return state.setIn(["forms", action.payload.form, "isValid"], false);
      }
      break;
    case "register" :
      if (form.get("emailError") === "" && form.get("email") !== ""
        && form.get("firstNameError") === "" && form.get("firstName") !== ""
        && form.get("lastNameError") === "" && form.get("lastName") !== ""
        && form.get("middleNameError") === "" && form.get("middleName") !== ""
        && form.get("passwordError") === "" && form.get("password") !== ""
        && form.get("confirmPasswordError") === "" && form.get("confirmPassword") !== "") {
        return state.setIn(["forms", action.payload.form, "isValid"], true);
      } else {
        return state.setIn(["forms", action.payload.form, "isValid"], false);
      }
      break;
    case "userProfile" :
      if (form.get("firstNameError") === "" && form.get("firstName") !== ""
        && form.get("lastNameError") === "" && form.get("lastName") !== ""
        && form.get("middleNameError") === "" && form.get("middleName") !== "") {
        return state.setIn(["forms", action.payload.form, "isValid"], true);
      } else {
        return state.setIn(["forms", action.payload.form, "isValid"], false);
      }
      break;
  }
  return state;

}