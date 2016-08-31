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
import I18n from "../utils/i18n";
let Form = t.form.Form;

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <FilteredMeasuresView
          style={{height: Platform.OS === "ios" ? 235 : 196}}
          header={I18n.t("headerMyNotes")}
          updateList={this.props.updateList}
          navigator={this.props.navigator}
          measuresList={this.props.measuresList}
          filterItems={this.props.filterItems}
          measuresNamesList={this.props.measuresNamesList}
          focusedElement={this.props.focusedElement}
          actions={this.props.actions}
          isKeyboardShown={this.props.isKeyboardShown}
          icons={this.props.icons}
          currentMeasure={this.props.currentMeasure}
          features={this.props.features}
          lang={this.props.lang}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});