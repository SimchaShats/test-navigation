'use strict';

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js';

const emailConstraints = {
  email: {
    email: {
      message: "doesn't look like valid"
    }
  }
};

const namePattern = /^[a-zA-Z][a-zA-Z\-\s]{0,15}[a-zA-Z]$|^[א-ת][א-ת\-\s]{0,15}[א-ת]$|^[а-яА-Я][а-яА-Я\-\s]{0,15}[а-яА-Я]$/;
const firstNameConstraints = {
  firstName: {
    format: {
      pattern: namePattern,
      flags: 'i',
      message: "must have 2-16 letters, whitespaces or symbols \"-\""
    }
  }
};

const lastNameConstraints = {
  lastName: {
    format: {
      pattern: namePattern,
      flags: 'i',
      message: "must have 2-16 letters, whitespaces or symbol \"-\""
    }
  }
};

const middleNameConstraints = {
  middleName: {
    format: {
      pattern: namePattern,
      flags: 'i',
      message: "must have 2-16 letters, whitespaces or symbol \"-\""
    }
  }
};

const passwordPattern =  /^[a-zA-Z0-9!@#$%^&*]{6,12}$/;
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: "i",
      message: "have between 6-12 in length"
    }
  }
};

const confirmPasswordConstraints = {
  confirmPassword: {
    equality: "password"
  }
};

export default function (state, action) {
  const {field, value, form} = action.payload;

  switch(field) {
    case('firstName'):
      const firstNameError = validate({firstName: value}, firstNameConstraints) || "";
      return state.setIn(['forms', action.payload.form, 'firstNameError'], firstNameError && firstNameError.firstName);
      break;
    
    case('lastName'):
      const lastNameError = validate({lastName: value}, lastNameConstraints) || "";
      return state.setIn(['forms', action.payload.form, 'lastNameError'], lastNameError && lastNameError.lastName);
      break;

    case('middleName'):
      const middleNameError = validate({middleName: value}, middleNameConstraints) || "";
      return state.setIn(['forms', action.payload.form, 'middleNameError'], middleNameError && middleNameError.middleName);
      break;

    case('email'):
      const emailError = validate({email: value}, emailConstraints) || "";
      return state.setIn(['forms', action.payload.form, 'emailError'], emailError && emailError.email);
      break;

    case('password'):
      const passwordError = validate({password: value}, passwordConstraints) || "";
      return state.setIn(['forms', action.payload.form, 'passwordError'], passwordError && passwordError.password);
      break;
    
    case('confirmPassword'):
      const confirmPasswordError = validate({password: state.get("forms").get(form).get("password"), confirmPassword: value}, confirmPasswordConstraints) || "";
      return state.setIn(['forms', action.payload.form, 'confirmPasswordError'], confirmPasswordError && confirmPasswordError.confirmPassword);
      break;
  }
  return state;

}