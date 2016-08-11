import React, {Component} from 'react';
import {
  Text,
  ListView,
  View,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Picker
} from 'react-native';
import Button from "./../UI/Button";
import Dimensions from "Dimensions";
import I18n from "../../i18n";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  onPress() {
    this.props.navigator.push({
      screen: 'UserProfileScreen',
      title: I18n.t("tabUserProfile"),
      passProps: {
        icons: this.props.icons,
        userId: this.props.profile.get("id"),
        focusedElement: this.props.focusedElement
      },
      backButtonTitle: ""
    });
  }

  render() {
    let date = this.props.profile.get("birthDate");
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)} style={[styles.container, {width: Dimensions.get("window").width}]}>
        <Text style={styles.username}>{this.props.profile.get("firstName")} {this.props.profile.get("lastName")}</Text>
        <Text style={styles.birthDate}>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray"
  },
  username: {
    flex: 1,
    textAlign: "left",
    fontWeight: "bold"
  },
  birthDate: {
    flex: 1,
    textAlign: "left",
    color: "gray",
    fontSize: 12
  }
});