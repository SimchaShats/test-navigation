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
const { Keyboard } = require('react-native');
const dismissKeyboard = require('dismissKeyboard');
import I18n from "../../i18n";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.isKeyboardShown !== this.props.isKeyboardShown && !nextProps.isKeyboardShown) {
      //this.input.blur();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput}
                   autoCorrect={false}
                   ref={r => this.input = r}
                   onChangeText={this.props.updateSearchCondition}
                   underlineColorAndroid="transparent"
                   placeholder={I18n.t("placeholderFriendName")}/>
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
    padding: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  textInput: {
    flex: 1,
    height: Platform.OS === "ios" ? 16 : 52,
    fontSize: 14
  }
});