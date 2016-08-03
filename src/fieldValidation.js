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

const passwordAgainConstraints = {
  confirmPassword: {
    equality: "password"
  }
};

export default function (state, action) {
  const {field, value, form} = action.payload;

  switch(field) {
    case('firstName'):
      const firstNameError = validate({firstName: value}, firstNameConstraints) || null;
      return state.setIn(['forms', action.payload.form, 'firstNameError'], firstNameError && firstNameError.firstName);
      break;
    
    case('lastName'):
      const lastNameError = validate({lastName: value}, lastNameConstraints) || null;
      return state.setIn(['forms', action.payload.form, 'lastNameError'], lastNameError && lastNameError.lastName);
      break;

    case('email'):
      const emailError = validate({email: value}, emailConstraints) || null;
      return state.setIn(['forms', action.payload.form, 'emailError'], emailError && emailError.email);
      break;

    case('password'):
      const passwordError = validate({password: value}, passwordConstraints) || null;
      return state.setIn(['forms', action.payload.form, 'passwordError'], passwordError && passwordError.password);
      break;
    
    case('confirmPassword'):
      const passwordAgainError = validate({password: state.get("forms").get(form).get("password"), confirmPassword: value}, passwordAgainConstraints) || null;
      return state.setIn(['forms', action.payload.form, 'passwordAgainError'], passwordAgainError && passwordAgainError.confirmPassword);
      break;
  }
  return state;

}