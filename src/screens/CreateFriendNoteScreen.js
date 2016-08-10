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
import * as appActions from '../redux/app/actions';
import {Map} from 'immutable';
import FilteredListView from "../components/measuresViews/FilteredMeasuresView";
import SettingsPage from "../components/SettingsPage";
import FriendsSearch from "../components/friendsViews/FriendsSearch";
import I18n from "../i18n";

// this is a traditional React component connected to the redux store
class CreateFriendNoteScreen extends Component {

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
    nextProps.navigator.setTitle({title: I18n.t("tabCreateNote")});
  }

  render() {
    return (
        <FriendsSearch
          usersList={this.props.usersList}
          focusedElement={this.props.focusedElement}
          navigator={this.props.navigator}
          icons={this.props.icons}
          actions={this.props.actions}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    usersList: state.user.get("usersList"),
    focusedElement: state.app.get("focusedElement")
  };
}

const actions = [
  measuresActions,
  appActions
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateFriendNoteScreen);
