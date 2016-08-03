"use strict";
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Picker
} from 'react-native';

import {UI} from "../constants";
import Button from "./Button";
const dismissKeyboard = require('dismissKeyboard');
const t = require('tcomb-form-native');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
let Form = t.form.Form;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: ""
    }
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.hasKeyboardShown) {
      nextProps.navigator.setButtons({
        rightButtons: [
          {
            icon: require('../../img/navicon_add.png'),
            id: 'cancel'
          }
        ],
        leftButtons: [],
        animated: true
      });
    } else {
      this.props.navigator.setButtons({rightButtons: [], leftButtons: [
        {
          title: "Close",
          id: 'close'
        }
      ]});
    }
  }

  onNavigatorEvent(event) {
    if (event.id === "close") {
      this.props.navigator.dismissModal();
    }
    if (event.id === "cancel") {
      dismissKeyboard();
    }
  }

  onChange(value) {
    this.props.actions.changeFormField("register", "email", value.email);
    this.props.actions.changeFormField("register", "firstName", value.firstName);
    this.props.actions.changeFormField("register", "lastName", value.lastName);
    this.props.actions.changeFormField("register", "password", value.password);
    this.props.actions.changeFormField("register", "confirmPassword", value.confirmPassword);
  }

  render() {
    let options = {
      auto: 'placeholders',
      fields: {}
    };
    let email = {
      label: 'Email',
      autoCorrect: false,
      keyboardType: 'email-address',
      hasError: this.props.form.get("emailError"),
      error: this.props.form.get("emailError")
    };
    let firstName = {
      label: 'First Name',
      maxLength: 16,
      hasError: this.props.form.get("firstNameError"),
      error: this.props.form.get("firstNameError")
    };
    let lastName = {
      label: 'Last Name',
      maxLength: 16,
      hasError: this.props.form.get("lastNameError"),
      error: this.props.form.get("lastNameError")
    };
    let password = {
      label: 'Password',
      maxLength: 12,
      secureTextEntry: true,
      hasError: this.props.form.get("passwordError"),
      error: this.props.form.get("passwordError")
    };
    let confirmPassword = {
      label: 'Confirm password',
      maxLength: 12,
      secureTextEntry: true,
      hasError: this.props.form.get("passwordAgainError"),
      error: this.props.form.get("passwordAgainError")
    };

    const registerForm = t.struct({
      email: t.String,
      firstName: t.String,
      lastName: t.String,
      password: t.String,
      confirmPassword: t.String
    });

    options.fields['email'] = email;
    options.fields['firstName'] = firstName;
    options.fields['lastName'] = lastName;
    options.fields['password'] = password;
    options.fields['confirmPassword'] = confirmPassword;

    return (
      <KeyboardAwareScrollView getTextInputRefs={() => [
      this.form.getComponent("email").refs.input,
      this.form.getComponent("firstName").refs.input,
      this.form.getComponent("lastName").refs.input,
      this.form.getComponent("password").refs.input,
      this.form.getComponent("confirmPassword").refs.input
      ]}>
        <View style={styles.container}>
          <Form ref={(r) => this.form = r}
                type={registerForm}
                options={options}
                value={{
                email: this.props.form.get("email"),
                firstName: this.props.form.get("firstName"),
                lastName: this.props.form.get("lastName"),
                password: this.props.form.get("password"),
                confirmPassword: this.props.form.get("confirmPassword")
                }}
                onChange={this.onChange.bind(this)}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonSignUp, {backgroundColor: this.props.form.get("isValid") ? "orange" : "rgba(64, 64, 64, 0.5)"}]}
            disabled={!this.props.form.get("isValid")}
            onPress={this.props.actions.signUp.bind(null, this.props.form.get("email"), this.props.form.get("password"), this.props.form.get("firstName"), this.props.form.get("lastName"))}>
            <Text style={styles.buttonText}>Sing Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  title: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonSignUp: {
    backgroundColor: 'green'
  }
});