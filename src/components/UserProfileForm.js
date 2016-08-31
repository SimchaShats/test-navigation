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
import I18n from "../utils/i18n";
let Form = t.form.Form;

export default class extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.focusedElement !== this.props.focusedElement || isComponentDidMount) {
     /* else if (this.props.focusedElement === "textInputformData" || !nextProps.focusedElement) {
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

    if (nextProps.isKeyboardShown !== this.props.isKeyboardShown && !nextProps.isKeyboardShown) {
      this.form.getComponent("firstName") && this.form.getComponent("firstName").refs.input.blur();
      this.form.getComponent("lastName") && this.form.getComponent("lastName").refs.input.blur();
      this.form.getComponent("lastName") && this.form.getComponent("lastName").refs.input.blur();
      this.form.getComponent("middleName") && this.form.getComponent("middleName").refs.input.blur();
      this.form.getComponent("confirmPassword") && this.form.getComponent("confirmPassword").refs.input.blur();
      this.form.getComponent("email") && this.form.getComponent("email").refs.input.blur();
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
    this.props.form.has("email") && this.props.actions.changeFormField(this.props.formName, "email", value.email);
    this.props.form.has("firstName") && this.props.actions.changeFormField(this.props.formName, "firstName", value.firstName);
    this.props.form.has("middleName") && this.props.actions.changeFormField(this.props.formName, "middleName", value.middleName);
    this.props.form.has("lastName") && this.props.actions.changeFormField(this.props.formName, "lastName", value.lastName);
    this.props.form.has("password") && this.props.actions.changeFormField(this.props.formName, "password", value.password);
    this.props.form.has("birthDate") && this.props.actions.changeFormField(this.props.formName, "birthDate", value.birthDate);
    this.props.form.has("confirmPassword") && this.props.actions.changeFormField(this.props.formName, "confirmPassword", value.confirmPassword);
    this.props.form.has("lang") && this.props.actions.changeFormField(this.props.formName, "lang", value.lang);
    this.props.actions.changeLanguage(value.lang, true);
  }

  render() {
    let options = {
      auto: 'placeholders',
      fields: {}
    };
    let email = {
      label: I18n.t("fieldEmail"),
      placeholder: I18n.t("fieldEmail"),
      autoCorrect: false,
      keyboardType: 'email-address',
      hasError: this.props.form.get("emailError"),
      error: this.props.form.get("emailError")
    };
    let firstName = {
      label: I18n.t("fieldFirstName"),
      placeholder: I18n.t("fieldFirstName"),
      maxLength: 16,
      hasError: this.props.form.get("firstNameError"),
      error: this.props.form.get("firstNameError")
    };
    let middleName = {
      label: I18n.t("fieldMiddleName"),
      placeholder: I18n.t("fieldMiddleName"),
      maxLength: 16,
      hasError: this.props.form.get("middleNameError"),
      error: this.props.form.get("middleNameError")
    };
    let birthDate = {
      label: I18n.t("fieldBirthDate"),
      mode: "date",
      maximumDate: new Date(),
      minimumDate: new Date(1900, 0, 1),
      config: {format: (date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`},
      hasError: this.props.form.get("birthDateError"),
      error: this.props.form.get("birthDateError")
    };
    let lang = {
      label: I18n.t("fieldLanguage"),
      placeholder: I18n.t("fieldLanguage"),
      nullOption: false,
      value: "en"
    };
    let languagesList = {...LANGUAGES};
    let lastName = {
      label: I18n.t("fieldLastName"),
      placeholder: I18n.t("fieldLastName"),
      maxLength: 16,
      hasError: this.props.form.get("lastNameError"),
      error: this.props.form.get("lastNameError")
    };
    let password = {
      label: I18n.t("fieldPassword"),
      placeholder: I18n.t("fieldPassword"),
      maxLength: 12,
      secureTextEntry: true,
      hasError: this.props.form.get("passwordError"),
      error: this.props.form.get("passwordError")
    };
    let confirmPassword = {
      label: I18n.t("fieldConfirmPassword"),
      placeholder: I18n.t("fieldConfirmPassword"),
      maxLength: 12,
      secureTextEntry: true,
      hasError: this.props.form.get("confirmPasswordError"),
      error: this.props.form.get("confirmPasswordError")
    };

    const formData = {};
    this.props.form.has("lang") && (formData.lang = t.enums(languagesList));
    this.props.form.has("birthDate") && (formData.birthDate = t.Date);
    this.props.form.has("email") && (formData.email = t.String);
    this.props.form.has("firstName") && (formData.firstName = t.String);
    this.props.form.has("lastName") && (formData.lastName = t.String);
    this.props.form.has("middleName") && (formData.middleName = t.String);
    this.props.form.has("password") && (formData.password = t.String);
    this.props.form.has("confirmPassword") && (formData.confirmPassword = t.String);

    const self = this;
    function getScrollFields() {
      let scrollFields = [];
      self.props.form.has("firstName") && scrollFields.push(self.form.getComponent("firstName").refs.input);
      self.props.form.has("email") && scrollFields.push(self.form.getComponent("email").refs.input);
      self.props.form.has("lastName") && scrollFields.push(self.form.getComponent("lastName").refs.input);
      self.props.form.has("middleName") && scrollFields.push(self.form.getComponent("middleName").refs.input);
      self.props.form.has("password") && scrollFields.push(self.form.getComponent("password").refs.input);
      self.props.form.has("confirmPassword") && scrollFields.push(self.form.getComponent("confirmPassword").refs.input);
      //self.props.form.has("birthDate") && scrollFields.push(self.form.getComponent("birthDate").refs.input);
      return scrollFields;
    }

    this.props.form.has("email") && (options.fields['email'] = email);
    this.props.form.has("firstName") && (options.fields['firstName'] = firstName);
    this.props.form.has("lastName") && (options.fields['lastName'] = lastName);
    this.props.form.has("password") && (options.fields['password'] = password);
    this.props.form.has("middleName") && (options.fields['middleName'] = middleName);
    this.props.form.has("confirmPassword") && (options.fields['confirmPassword'] = confirmPassword);
    this.props.form.has("birthDate") && (options.fields['birthDate'] = birthDate);
    this.props.form.has("lang") && (options.fields['lang'] = lang);

    let value = {};
    this.props.form.has("email") && (value.email = this.props.form.get("email"));
    this.props.form.has("firstName") && (value.firstName = this.props.form.get("firstName"));
    this.props.form.has("lastName") && (value.lastName = this.props.form.get("lastName"));
    this.props.form.has("password") && (value.password = this.props.form.get("password"));
    this.props.form.has("middleName") && (value.middleName = this.props.form.get("middleName"));
    this.props.form.has("confirmPassword") && (value.confirmPassword = this.props.form.get("confirmPassword"));
    this.props.form.has("birthDate") && (value.birthDate = this.props.form.get("birthDate"));
    this.props.form.has("lang") && (value.lang = this.props.form.get("lang"));

    return (
      <KeyboardAwareScrollView marginScrollTop={70} getTextInputRefs={() => getScrollFields()}>
        <View style={styles.container}>
          <Form ref={(r) => this.form = r}
                type={t.struct(formData)}
                options={options}
                value={value}
                onChange={this.onChange.bind(this)}/>
          {this.props.form.has("firstName") && this.props.form.has("lastName") && this.props.form.has("middleName") && <TouchableOpacity
            style={[styles.button, styles.buttonSignUp, {backgroundColor: this.props.form.get("isValid") ? "orange" : "rgba(64, 64, 64, 0.5)"}]}
            disabled={!this.props.form.get("isValid")}
            onPress={() => {this.props.doneAction()}}>
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