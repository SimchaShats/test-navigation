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

import {UI, LANGUAGES} from "../constants";
import Button from "./UI/Button";
const dismissKeyboard = require('dismissKeyboard');
const t = require('tcomb-form-native');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import I18n from "../i18n";
let Form = t.form.Form;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginScrollTop: 0,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      birthDate: "",
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
    if (nextProps.focusedElement !== this.props.focusedElement || isComponentDidMount) {
     /* else if (this.props.focusedElement === "textInputUserProfileForm" || !nextProps.focusedElement) {
        const buttonClose = {
          icon: nextProps.icons.clearIcon,
          id: 'close'
        };
        this.props.navigator.setButtons({
          rightButtons: Platform.OS === "ios" ? [] : [buttonClose], leftButtons: Platform.OS === "ios" ? [buttonClose] : [],
          animated: true
        });
      }*/
    }
  }

  onNavigatorEvent(event) {
    if (event.id === "close") {
      this.props.navigator.dismissModal();
    }
    if (event.id === "done") {
      dismissKeyboard();
    }
  }

  onChange(value) {
    this.props.actions.changeFormField("userProfile", "email", value.email);
    this.props.actions.changeFormField("userProfile", "firstName", value.firstName);
    this.props.actions.changeFormField("userProfile", "lastName", value.lastName);
    this.props.actions.changeFormField("userProfile", "password", value.password);
    this.props.actions.changeFormField("userProfile", "confirmPassword", value.confirmPassword);
    this.props.actions.changeFormField("userProfile", "lang", value.lang);
    this.props.actions.changeLanguage(value.lang, true);
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
      onFocus: this.props.actions.focusElement.bind(null, "textInputUserProfileForm"),
      onBlur: this.props.actions.focusElement.bind(null, null),
      hasError: this.props.form.get("emailError"),
      error: this.props.form.get("emailError")
    };
    let firstName = {
      label: I18n.t("fieldFirstName"),
      maxLength: 16,
      onFocus: this.props.actions.focusElement.bind(null, "textInputUserProfileForm"),
      onBlur: this.props.actions.focusElement.bind(null, null),
      hasError: this.props.form.get("firstNameError"),
      error: this.props.form.get("firstNameError")
    };
    let birthDate = {
      label: I18n.t("fieldBirthDate"),
      mode: "date",
      maximumDate: new Date(),
      minimumDate: new Date(1900, 0, 1),
      config: {format: (date) => `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`},
      hasError: this.props.form.get("birthDateError"),
      error: this.props.form.get("birthDateError")
    };
    let lang = {
      label: I18n.t("fieldLanguage"),
      nullOption: false,
      value: "en"
    };
    let languagesList = {...LANGUAGES};
    let lastName = {
      label: I18n.t("fieldLastName"),
      maxLength: 16,
      onFocus: this.props.actions.focusElement.bind(null, "textInputUserProfileForm"),
      onBlur: this.props.actions.focusElement.bind(null, null),
      hasError: this.props.form.get("lastNameError"),
      error: this.props.form.get("lastNameError")
    };
    let password = {
      label: I18n.t("fieldPassword"),
      maxLength: 12,
      secureTextEntry: true,
      onFocus: this.props.actions.focusElement.bind(null, "textInputUserProfileForm"),
      onBlur: this.props.actions.focusElement.bind(null, null),
      hasError: this.props.form.get("passwordError"),
      error: this.props.form.get("passwordError")
    };
    let confirmPassword = {
      label: I18n.t("fieldConfirmPassword"),
      maxLength: 12,
      secureTextEntry: true,
      onFocus: this.props.actions.focusElement.bind(null, "textInputUserProfileForm"),
      onBlur: this.props.actions.focusElement.bind(null, null),
      hasError: this.props.form.get("passwordAgainError"),
      error: this.props.form.get("passwordAgainError")
    };

    const userProfileForm = {};
    this.props.form.has("lang") && (userProfileForm.lang = t.enums(languagesList));
    this.props.form.has("birthDate") && (userProfileForm.birthDate = t.Date);
    this.props.form.has("email") && (userProfileForm.email = t.String);
    this.props.form.has("firstName") && (userProfileForm.firstName = t.String);
    this.props.form.has("lastName") && (userProfileForm.lastName = t.String);
    this.props.form.has("password") && (userProfileForm.password = t.String);
    this.props.form.has("confirmPassword") && (userProfileForm.confirmPassword = t.String);

    const self = this;
    function getScrollFields() {
      let scrollFields = [];
      self.props.form.has("firstName") && scrollFields.push(self.form.getComponent("firstName").refs.input);
      self.props.form.has("email") && scrollFields.push(self.form.getComponent("email").refs.input);
      self.props.form.has("lastName") && scrollFields.push(self.form.getComponent("lastName").refs.input);
      self.props.form.has("password") && scrollFields.push(self.form.getComponent("password").refs.input);
      self.props.form.has("confirmPassword") && scrollFields.push(self.form.getComponent("confirmPassword").refs.input);
      self.props.form.has("birthDate") && scrollFields.push(self.form.getComponent("birthDate").refs.input);
      console.log(scrollFields);
      return scrollFields;
    }

    options.fields['email'] = email;
    options.fields['firstName'] = firstName;
    options.fields['lastName'] = lastName;
    options.fields['password'] = password;
    options.fields['confirmPassword'] = confirmPassword;
    options.fields['birthDate'] = birthDate;
    options.fields['lang'] = lang;

    return (
      <KeyboardAwareScrollView marginScrollTop={70} getTextInputRefs={() => getScrollFields()}>
        <View style={styles.container}>
          <Form ref={(r) => this.form = r}
                type={t.struct(userProfileForm)}
                options={options}
                value={{
                  email: this.props.form.get("email"),
                  firstName: this.props.form.get("firstName"),
                  lastName: this.props.form.get("lastName"),
                  password: this.props.form.get("password"),
                  confirmPassword: this.props.form.get("confirmPassword"),
                  birthDate: this.props.form.get("birthDate"),
                  lang: this.props.form.get("lang")
                }}
                onChange={this.onChange.bind(this)}
          />
          {this.props.form.has("firstName") && this.props.form.has("lastName") && <TouchableOpacity
            style={[styles.button, styles.buttonSignUp, {backgroundColor: this.props.form.get("isValid") ? "orange" : "rgba(64, 64, 64, 0.5)"}]}
            disabled={!this.props.form.get("isValid")}
            onPress={() => {this.props.doneAction(this.props.form.get("email"),
              this.props.form.get("password"),
              this.props.form.get("firstName"),
              this.props.form.get("lastName"),
              this.props.form.get("birthDate")
            )}}>
            <Text style={styles.buttonText}>{this.props.buttonDone}</Text>
          </TouchableOpacity>}
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
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonSignUp: {
    backgroundColor: 'green'
  }
});