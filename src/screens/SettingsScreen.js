"use strict";
import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as measuresActions from '../redux/measures/actions';
import * as userActions from '../redux/user/actions';
import * as appActions from '../redux/app/actions';
import {Map} from 'immutable';
import FilteredMeasuresView from "../components/measuresViews/FilteredMeasuresView";
import UserProfileForm from "../components/UserProfileForm";
var Spinner = require('react-native-spinkit');
import I18n from "../i18n";

// this is a traditional React component connected to the redux store
class SettingsScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.icons && (nextProps.isKeyboardShown !== this.props.isKeyboardShown || isComponentDidMount)) {
      if (!nextProps.isKeyboardShown) {
        nextProps.navigator.setButtons({
          rightButtons: [],
          leftButtons: [],
          animated: true
        });
      } else {
        nextProps.navigator.setButtons({
          rightButtons: [
            {
              icon: nextProps.icons.doneIcon,
              id: 'done'
            }
          ],
          leftButtons: [],
          animated: true
        });
      }
    }
  }

  updateUserProfile(...args) {
    this.props.actions.updateUserProfile(...args).then(() => {
      Alert.alert(I18n.t("titleMessage"), I18n.t("messageProfileUpdatedSuccess"));
    })
  }

  render() {
    let userProfileForm = this.props.form.delete("email").delete("password").delete("confirmPassword");
    !this.props.isUserLoggedIn && (userProfileForm = userProfileForm.delete("email").delete("birthDate").delete("firstName").delete("lastName").delete("middleName").delete("password").delete("confirmPassword"));
    return (
      <View style={styles.container}>
        <UserProfileForm navigator={this.props.navigator}
                         actions={this.props.actions}
                         form={userProfileForm}
                         icons={this.props.icons}
                         userProfile={this.props.userProfile}
                         lang={this.props.lang}
                         isKeyboardShown={this.props.isKeyboardShown}
                         buttonDone={I18n.t("buttonUpdateUserProfile")}
                         doneAction={this.updateUserProfile.bind(this)}
                         focusedElement={this.props.focusedElement}
                         isFetching={this.props.isFetching}/>

        {this.props.isFetching.get("user") && <View style={styles.overlay}>
          <Spinner size={100} type="9CubeGrid" color="#FFFFFF"/>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  }
});

function mapStateToProps(state) {
  return {
    userProfile: state.user.get("profile"),
    isUserLoggedIn: state.user.get("isLoggedIn"),
    isKeyboardShown: state.app.get("isKeyboardShown"),
    focusedElement: state.app.get("focusedElement"),
    form: state.app.get("forms").get("userProfile"),
    lang: state.app.get("lang"),
    isFetching: state.app.get("isFetching")
  };
}

const actions = [
  measuresActions,
  appActions,
  userActions
];

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
