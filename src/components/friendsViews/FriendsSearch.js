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
import SearchConditionRow from "./SearchConditionRow";
import UsersList from "./UsersList";
const { Keyboard } = require('react-native');
import Dimensions from "Dimensions";
const dismissKeyboard = require('dismissKeyboard');
import I18n from "../../i18n";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCondition: ""
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
      if (nextProps.focusedElement === "textInputFriendsSearch") {
        nextProps.navigator.setButtons({
          rightButtons: [{
              icon: nextProps.icons.doneIcon,
              id: 'done'
            }],
          leftButtons: [],
          animated: true
        });
      } else if (this.props.focusedElement === "textInputFriendsSearch") {
        nextProps.navigator.setButtons({
          rightButtons: [],
          leftButtons: [],
          animated: true
        });
      }
    }
  }

  onNavigatorEvent(event) {
    if (event.id === 'confirm') {
      dismissKeyboard();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.caption, {width: Dimensions.get("window").width}]}>{I18n.t("headerFriendsSearch")}</Text>
        <SearchConditionRow actions={this.props.actions} updateSearchCondition={(searchCondition) => this.setState({searchCondition})}/>
        <UsersList focusedElement={this.props.focusedElement} usersList={this.props.usersList}
                   navigator={this.props.navigator} searchCondition={this.state.searchCondition} icons={this.props.icons}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  caption: {
    padding: 10,
    textAlign: "left"
  },
  searchTextWrapper: {
    borderColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchText: {
    height: 30,
    fontSize: 14
  }
});