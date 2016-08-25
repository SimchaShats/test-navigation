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
import Button from "./UI/Button";
const dismissKeyboard = require('dismissKeyboard');
const t = require('tcomb-form-native');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
let Form = t.form.Form;
import I18n from "../i18n";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
    if (nextProps.icons && (nextProps.focusedElement !== this.props.focusedElement || isComponentDidMount)) {
      if (nextProps.focusedElement === "textInputLoginForm") {
        nextProps.navigator.setButtons({
          rightButtons: [
            {
              icon: nextProps.icons.doneIcon,
              id: 'done'
            }
          ],
          leftButtons: [],
          animated: true
        });
      } else if (!nextProps.focusedElement) {
        nextProps.navigator.setButtons({
          rightButtons: [],
          leftButtons: [],
          animated: true
        });
      }
    }
  }

  onNavigatorEvent(event) {
    dismissKeyboard();
  }

  onChange(value) {
    this.props.actions.changeFormField("login", "email", value.email);
    this.props.actions.changeFormField("login", "password", value.password);
  }

  render() {
    let options = {
      auto: 'placeholders',
      fields: {}
    };
    let email = {
      label: I18n.t("fieldEmail"),
      autoCorrect: false,
      keyboardType: 'email-address',
      hasError: this.props.form.get("emailError"),
      onFocus: this.props.actions.focusElement.bind(null, "textInputLoginForm"),
      onBlur: this.props.actions.focusElement.bind(null, null),
      error: this.props.form.get("emailError")
    };
    let password = {
      label: I18n.t("fieldPassword"),
      maxLength: 12,
      secureTextEntry: true,
      onFocus: this.props.actions.focusElement.bind(null, "textInputLoginForm"),
      onBlur: this.props.actions.focusElement.bind(null, null),
      hasError: this.props.form.get("passwordError"),
      error: this.props.form.get("passwordError")
    };

    const loginForm = t.struct({
      email: t.String,
      password: t.String
    });

    options.fields['email'] = email;
    options.fields['password'] = password;

    return (
      <KeyboardAwareScrollView marginScrollTop={70} getTextInputRefs={() => [this.form.getComponent("password").refs.input, this.form.getComponent("email").refs.input]}>
        <View style={styles.container}>
          <Text style={styles.header}>{this.props.header}</Text>
          <Form ref={(r) => this.form = r}
                type={loginForm}
                options={options}
                value={{email: this.props.form.get("email"), password: this.props.form.get("password")}}
                onChange={this.onChange.bind(this)}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonSignIn, {backgroundColor: this.props.form.get("isValid") ? "green" : "rgba(64, 64, 64, 0.5)"}]}
            disabled={!this.props.form.get("isValid")}
            onPress={this.props.actions.signIn.bind(null, this.props.form.get("email"), this.props.form.get("password"))}>
            <Text style={styles.buttonText}>{I18n.t("buttonSignIn")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonRegister]} onPress={this.props.showRegisterScreen}>
            <Text style={styles.buttonText}>{I18n.t("buttonRegister")}</Text>
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
  header: {
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
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonSignIn: {
    backgroundColor: 'green'
  },
  buttonRegister: {
    backgroundColor: '#48BBEC'
  }
});