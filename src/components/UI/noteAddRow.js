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
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }



  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.focusedElement !== this.props.focusedElement || isComponentDidMount) {
      if (nextProps.focusedElement === "textInputNoteAddRow") {
        nextProps.navigator.setButtons({
          rightButtons: [
            {
              icon: this.props.icons.doneIcon,
              id: 'done'
            }
          ],
          leftButtons: [
            {
              icon: this.props.icons.replyIcon,
              id: 'cancel'
            }
          ],
          animated: true
        });
        nextProps.isSetTitle && this.props.navigator.setTitle({
          title: nextProps.measuresNamesList.get(this.state.filterValue)
        });
      } else if (this.props.focusedElement === "textInputNoteAddRow") {
        nextProps.navigator.setButtons({
          rightButtons: [],
          leftButtons: [],
          animated: true
        });
        nextProps.isSetTitle && nextProps.navigator.setTitle({
          title: "My Notes"
        });
      }
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'done') {
      this.state.text.trim() !== "" && this.props.doneAction && this.props.doneAction(this.props.measure, this.state.text);
      this.setState({text: ""});
    }
    this.setState({text: ""});
    dismissKeyboard();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={[styles.textInput, {height: 16 * (this.props.lines || 2)}]} multiline={true} value={this.state.text}
                   onChangeText={(text) => {this.setState({text}); this.props.onChangeText && this.props.onChangeText(text);}}
                   onFocus={this.props.actions.focusElement.bind(null, "textInputNoteAddRow")}
                   onBlur={this.props.actions.focusElement.bind(null)}
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
    padding: 10,
    alignItems: "center"
  },
  textInput: {
    flex: 1,
    fontSize: 14
  }
});