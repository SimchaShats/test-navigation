"use strict";
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker
} from 'react-native';

import {UI} from "../constants";
import Button from "./Button";
const dismissKeyboard = require('dismissKeyboard');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {

  }

  onNavigatorEvent(event) {
    dismissKeyboard();
  }

  render() {
    return (
      <ScrollView style={[styles.container, {height: this.props.visibleHeight}]}>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.inputsWrapper}><TextInput keyboardType="email-address" placeholder="E-mail" onChangeText={(email) => this.setState({email})} style={styles.input}/></View>
          <View style={styles.inputsWrapper}><TextInput secureTextEntry={true} placeholder="Password" onChangeText={(password) => this.setState({password})} style={styles.input}/></View>
          <View style={styles.buttonsWrapper}>
            <Button style={{backgroundColor: "#50A033", margin: 10}} onPress={this.props.actions.signIn.bind(null, this.state.email, this.state.password)}>Login</Button>
            <Button style={{backgroundColor: "#338DC0", margin: 10}}>Register</Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  content: {
    alignItems: "center",
    height: 300,
    justifyContent: "flex-start"
  },
  title: {
    marginBottom: 15
  },
  buttonsWrapper: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  inputsWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    alignSelf: "center",
    padding: 10,
    width: 200,
    height: 40
  },
  input: {
    flex: 1
  }
});