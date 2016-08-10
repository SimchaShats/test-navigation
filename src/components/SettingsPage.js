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
let Form = t.form.Form;
import I18n from "../i18n";

export default class extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
    this.props.navigator.setButtons({
      rightButtons: [{
        icon: this.props.icons.createIcon,
        id: 'createNote'
      }],
      leftButtons: [{
        title: I18n.t("buttonSignOut"),
        id: 'signOut'
      }],
      animated: true
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {

  }

  onNavigatorEvent(event) {
    if (event.id === 'createNote') {
      this.props.navigator.push({
        screen: 'CreateFriendNoteScreen',
        title: "Create note",
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