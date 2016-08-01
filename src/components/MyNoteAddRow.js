import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  Alert,
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
    };
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
    switch (event.id) {
      case 'add':
        this.state.text.trim() !== "" && this.props.addAction(this.props.measure, this.state.text);
        this.setState({text: ""});
        dismissKeyboard();
        break;
      case 'cancel':
        this.setState({text: ""});
        dismissKeyboard();
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput} multiline={true} value={this.state.text}
                   onChangeText={(text) => this.setState({text})}
                   placeholder="Type your note about yourself to improve your measure..."/>
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
  textInput: {
    flex: 1,
    height: 30,
    fontSize: 14
  }
});