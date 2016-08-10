"use strict";
import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Picker
} from 'react-native';

import {UI} from "../../constants"

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.container, this.props.style]}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 85
  }
});