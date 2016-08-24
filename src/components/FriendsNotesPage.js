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
import FilteredMeasuresView from "./measuresViews/FilteredMeasuresView";
const dismissKeyboard = require('dismissKeyboard');
const t = require('tcomb-form-native');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import I18n from "../i18n";
let Form = t.form.Form;

export default class extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.isUserLoggedIn !== this.props.isUserLoggedIn && nextProps.isUserLoggedIn === true || isComponentDidMount) {
      const buttonCreateNote = {
        icon: nextProps.icons.createIcon,
        id: 'createNote'
      };
      const buttonSignOut = {
        title: I18n.t("buttonSignOut"),
        id: 'signOut'
      };
      nextProps.navigator.setButtons({
        rightButtons: Platform.OS === "ios" ? [buttonCreateNote] : [buttonCreateNote, buttonSignOut],
        leftButtons: Platform.OS === "ios" ? [buttonSignOut] : [],
        animated: true
      });
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'createNote') {
      this.props.navigator.push({
        title: I18n.t("tabCreateNote"),
        screen: 'CreateFriendNoteScreen',
        passProps: {
          icons: this.props.icons
        },
        backButtonTitle: ""
      });
    }
    if (event.id === 'signOut') {
      this.props.actions.signOut();
    }
  }

  render() {
    return (
      <FilteredMeasuresView navigator={this.props.navigator}
                            measuresList={this.props.measuresFriendsNotesList}
                            measuresNamesList={this.props.measuresNamesList}
                            updateList={this.props.actions.getFriendsNotesList}
                            actions={this.props.actions}
                            icons={this.props.icons}
                            features={this.props.features}/>
    );
  }
}