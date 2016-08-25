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
  Alert,
  Picker
} from 'react-native';

import {UI} from "../constants";
import Button from "./UI/Button";
import Filter from "./measuresViews/Filter";
import NoteAddRow from "./UI/NoteAddRow";
import FilteredMeasuresView from "./measuresViews/FilteredMeasuresView";
const dismissKeyboard = require('dismissKeyboard');
const t = require('tcomb-form-native');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
let Form = t.form.Form;
import I18n from "../i18n";

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: null,
      noteMessage: ""
    }
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.focusedElement !== this.props.focusedElement
      && this.props.focusedElement === "textInputNoteAddRow" || isComponentDidMount) {
      nextProps.navigator.setButtons({
        rightButtons: [],
        leftButtons: [],
        animated: true
      });
    }
  }

  sendNote() {
    this.props.actions.sendNoteToFriend(this.props.userId, this.state.filterValue, this.state.noteMessage, this.props.meProfile.get("id")).then(() => {
      this.setState({noteMessage: ""});
      Alert.alert(I18n.t("titleMessage"), I18n.t("messageSendNoteSuccess"));
    });
  }

  render() {
    const userProfile = this.props.usersList.get(this.props.userId);
    return (
      <View style={styles.container}>
        <View style={styles.caption}>
          <Text style={styles.username}>{userProfile.get("firstName")} {userProfile.get("lastName")}</Text>
          <Text style={styles.birthDate}>{`${userProfile.get("birthDate").getDate()}/${userProfile.get("birthDate").getMonth()}/${userProfile.get("birthDate").getFullYear()}`}</Text>
        </View>
        <Filter items={this.props.measuresNamesList} initialValue={this.state.filterValue} updateFilterValue={(filterValue)=>{this.setState({filterValue})}}/>
        <NoteAddRow actions={this.props.actions} lines={4} navigator={this.props.navigator} onChangeText={(noteMessage) => this.setState({noteMessage})} noteMessage={this.state.noteMessage}
                    focusedElement={this.props.focusedElement} icons={this.props.icons} placeholder={I18n.t("placeholderFriendNote")}/>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: this.state.noteMessage !== "" ? "orange" : "rgba(64, 64, 64, 0.5)"}]}
          disabled={this.state.noteMessage === ""}
          onPress={this.sendNote.bind(this)}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  caption: {
    padding: 10
  },
  username: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold"
  },
  button: {
    height: 36,
    borderRadius: 5,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  birthDate: {
    flex: 1,
    textAlign: "left",
    color: "gray",
    fontSize: 12
  }
});