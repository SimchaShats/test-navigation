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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: 0
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Type your note about yourself to improve your measure"/>
        <TouchableOpacity onPress={this.props.add} style={[styles.button, {width: this.state.buttonWidth}]}>
          <Text style={[{width: this.state.buttonWidth}]}>Add</Text>
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
  }
});