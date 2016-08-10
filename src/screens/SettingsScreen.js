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
    nextProps.navigator.setTitle({title: I18n.t("tabSettings")});
  }

  render() {
    let userProfileForm = this.props.form.delete("email");
    !this.props.isUserLoggedIn
      && (userProfileForm = userProfileForm.delete("email").delete("birthDate").delete("firstName").delete("lastName").delete("password").delete("confirmPassword"));
    return (
      <UserProfileForm navigator={this.props.navigator}
                    actions={this.props.actions}
                    form={userProfileForm}
                    icons={this.props.icons}
                    userProfile={this.props.userProfile}
                    lang={this.props.lang}
                    buttonDone={I18n.t("buttonUpdateProfile")}
                    focusedElement={this.props.focusedElement}
                    isFetching={this.props.isFetching}/>
    );
  }
}
function mapStateToProps(state) {
  return {
    userProfile: state.user.get("profile"),
    isUserLoggedIn: state.user.get("isLoggedIn"),
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
