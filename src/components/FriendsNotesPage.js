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
import FilteredListView from "./measuresViews/FilteredListView";
const dismissKeyboard = require('dismissKeyboard');
const t = require('tcomb-form-native');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
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
    if (nextProps.hasKeyboardShown) {

    } else {
      nextProps.navigator.setButtons({
        rightButtons: [{
          title: 'Send Note',
          id: 'sendNote'
        }],
        leftButtons: [{
          title: 'Sign Out',
          id: 'signOut'
        }]
      });
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'edit') {
      AlertIOS.alert('NavBar', 'Edit button pressed');
    }
    if (event.id === 'signOut') {
      this.props.actions.signOut();
    }
  }

  render() {
    return (
      <FilteredListView navigator={this.props.navigator}
                        hasKeyboardShown={this.props.hasKeyboardShown}
                        listItems={this.props.measuresFriendsNotesList}
                        filterItems={this.props.measuresNamesList}
                        measuresNamesList={this.props.measuresNamesList}
                        actions={this.props.actions}
                        features={this.props.features}/>
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
  buttonSignIn: {
    backgroundColor: 'green'
  },
  buttonRegister: {
    backgroundColor: '#48BBEC'
  }
});