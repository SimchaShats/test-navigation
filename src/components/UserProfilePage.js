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
    if ((nextProps.isKeyboardShown !== this.props.isKeyboardShown || isComponentDidMount)
      && !nextProps.isKeyboardShown) {
      nextProps.navigator.setButtons({
        rightButtons: [],
        leftButtons: [],
        animated: true
      });
    }
  }

  buildLocalName(profile) {
    if (profile.get("firstName")[0].search(/[a-zA-Z]/) > -1) {
      return `${profile.get("firstName")} son of ${profile.get("middleName")} ${profile.get("lastName")}}`;
    } else if (profile.get("firstName")[0].search(/[а-яА-Я]/) > -1) {
      return `${profile.get("firstName")} ${profile.get("lastName")} ${profile.get("middleName")}`;
    } else if (profile.get("firstName")[0].search(/[א-ת]/) > -1) {
      return `${profile.get("firstName")} בן ${profile.get("middleName")} ${profile.get("lastName")}`;
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
      <KeyboardAwareScrollView marginScrollTop={75} getTextInputRefs={() => [this.note.input]}>
        <View style={styles.caption}>
          <Text style={styles.username}>{this.buildLocalName(userProfile)}</Text>
          <Text
            style={styles.birthDate}>{`${userProfile.get("birthDate").getDate()}/${userProfile.get("birthDate").getMonth()}/${userProfile.get("birthDate").getFullYear()}`}</Text>
        </View>
        <Filter items={this.props.measuresNamesList} initialValue={this.state.filterValue}
                updateFilterValue={(filterValue)=>{this.setState({filterValue})}}/>
        <NoteAddRow actions={this.props.actions} lines={4} navigator={this.props.navigator}
                    isKeyboardShown={this.props.isKeyboardShown}
                    ref={r => this.note = r}
                    onChangeText={(noteMessage) => this.setState({noteMessage})} noteMessage={this.state.noteMessage}
                    focusedElement={this.props.focusedElement} icons={this.props.icons}
                    placeholder={I18n.t("placeholderFriendNote")}/>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: this.state.noteMessage.trim() !== "" ? "orange" : "rgba(64, 64, 64, 0.5)"}]}
          disabled={this.state.noteMessage.trim() === ""}
          onPress={()=>{this.sendNote.bind(this)}}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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