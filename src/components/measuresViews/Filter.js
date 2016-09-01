"use strict";
import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Picker
} from 'react-native';

import {UI} from "../../constants"

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
    if (nextProps.items.size > 0 && (nextProps.items !== this.props.items || isComponentDidMount)) {
      //this.props.updateFilterValue(nextProps.items.keySeq().first());
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
    top: Platform.OS === "ios" ? (UI.INITIAL_SIZES.DEVICE_HEIGHT <= 480 ? -60 : -40) : 0,
    height: Platform.OS === "ios" ? (UI.INITIAL_SIZES.DEVICE_HEIGHT <= 480 ? 95 : 135) : 60
  }
});