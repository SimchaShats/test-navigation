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
import Filter from "./../measuresViews/Filter";
import MeasuresList from "./../measuresViews/MeasuresList";
const { Keyboard } = require('react-native');
const dismissKeyboard = require('dismissKeyboard');
import I18n from "../../i18n";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: 0,
      text: ""
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.icons && (nextProps.focusedElement !== this.props.focusedElement || isComponentDidMount)) {
      if (nextProps.focusedElement === "textInputNoteAddRow") {
        const buttonDone = {
          icon: nextProps.icons.doneIcon,
          id: 'done'
        };
        const buttonCancel = {
          icon: nextProps.icons.replyIcon,
          id: 'cancel'
        };
        nextProps.navigator.setButtons({
          rightButtons: Platform.OS === "ios" ? [buttonDone] : [buttonDone, buttonCancel],
          leftButtons: Platform.OS === "ios" ? [buttonCancel] : [],
          animated: true
        });
        nextProps.title && nextProps.navigator.setTitle({
          title: nextProps.measuresNamesList.get(nextProps.title)
        });
      }
    }
    if (nextProps.noteMessage !== this.props.noteMessage) {
      this.setState({text: nextProps.noteMessage});
    }
    if (nextProps.isKeyboardShown !== this.props.isKeyboardShown && !nextProps.isKeyboardShown) {
      this.input.blur();
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'done') {
      this.state.text.trim() !== "" && this.props.doneAction && this.props.doneAction(this.props.measure, this.state.text);
      this.props.doneAction && this.setState({text: ""});
    } else if (event.id === 'cancel') {
      this.setState({text: ""});
    }
    dismissKeyboard();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={[styles.textInput, {height: (Platform.OS === "ios" ? 16 : 28) * (this.props.lines || 2)}]} multiline={true} value={this.state.text}
                   onChangeText={(text) => {this.setState({text}); this.props.onChangeText && this.props.onChangeText(text);}}
                   ref={r => this.input = r}
                   onFocus={this.props.actions.focusElement.bind(null, "textInputNoteAddRow")}
                   onBlur={this.props.actions.focusElement.bind(null, null)} underlineColorAndroid="transparent"
                   placeholder={this.props.placeholder}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  textInput: {
    flex: 1,
    fontSize: 14
  }
});