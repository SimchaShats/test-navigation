"use strict";
import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Picker
} from 'react-native';

import {UI} from "../constants"

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.items && (nextProps.items !== this.props.items || isComponentDidMount)) {
      this.props.updateFilterValue(nextProps.items.keySeq().first());
    }
  }

  getPickerItems() {
    let pickerItems = [];
    this.props.items.map((value, key) => {
      pickerItems.push(<Picker.Item key={`_${Date.now()}`} label={value} value={key}/>);
    });
    return pickerItems;
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Picker
          style={styles.picker}
          selectedValue={this.props.initialValue}
          onValueChange={this.props.updateFilterValue}>
          {this.getPickerItems()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === "android" ? 15 : 0,
    backgroundColor: "#3F51B5",
    overflow: "hidden"
  },
  picker: {
    top: Platform.OS === "ios" ? -40 : 0,
    height: Platform.OS === "ios" ? 135 : 0
  }
});