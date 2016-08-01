import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker
} from 'react-native';
import Filter from "./Filter";
import MeasuresList from "./MeasuresList";
const { Keyboard } = require('react-native');
const dismissKeyboard = require('dismissKeyboard');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: 0,
      text: ""
    }
  }

  componentWillMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  keyboardDidShow(e) {
    this.setState({buttonWidth: 100});
  }

  keyboardDidHide(e) {
    this.setState({buttonWidth: 0});
  }

  addAction() {
    this.state.text.trim() !== "" && this.props.addAction(this.props.measure, this.state.text);
    this.setState({text: ""});
    dismissKeyboard();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput} multiline={true} value={this.state.text} onChangeText={(text) => this.setState({text})} placeholder="Type your note about yourself to improve your measure..."/>
        <TouchableOpacity onPress={this.addAction.bind(this)} style={[styles.button, {width: this.state.buttonWidth, marginLeft: this.state.buttonWidth > 0 ? 10 : 0}]}>
          <Text>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    padding: 10,
    alignItems: "center"
  },
  button: {
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 100
  },
  textInput: {
    flex: 1,
    fontSize: 15
  }
});