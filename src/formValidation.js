'use strict';
import {} from "./redux/app/actionTypes";

export default function (state, action) {
  switch(action.payload.form) {
    case "login" :
      const formLogin = state.get("forms").get(action.payload.form);
      if (formLogin.get("emailError") !== "" && formLogin.get("email") !== "" && formLogin.get("passwordError") !== "" && formLogin.get("password") !== "") {
        return state.setIn(["forms", action.payload.form, "isValid"], true);
      } else {
        return state.setIn(["forms", action.payload.form, "isValid"], false);
      }
      break;
    case "userProfile" :
      const formRegister = state.get("forms").get(action.payload.form);
      console.log(formRegister.get("emailError"), formRegister.get("email"));
      if (formRegister.get("emailError") !== "" && formRegister.get("email") !== ""
        && formRegister.get("firstNameError") !== "" && formRegister.get("firstName") !== ""
        && formRegister.get("lastNameError") !== "" && formRegister.get("lastName") !== ""
        && formRegister.get("middleNameError") !== "" && formRegister.get("middleName") !== ""
        && formRegister.get("passwordError") !== "" && formRegister.get("password") !== ""
        && formRegister.get("confirmPasswordError") && formRegister.get("confirmPassword") !== "") {
        return state.setIn(["forms", action.payload.form, "isValid"], true);
      } else {
        return state.setIn(["forms", action.payload.form, "isValid"], false);
      }
      break;
  }
  return state;

}