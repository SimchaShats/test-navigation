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
import * as userActions from '../redux/user/actions';
import {Map} from 'immutable';
import FilteredListView from "../components/measuresViews/FilteredMeasuresView";
import SendFriendNotePage from "../components/SendFriendNotePage";
import FriendsSearch from "../components/friendsViews/FriendsSearch";
import I18n from "../utils/i18n";

// this is a traditional React component connected to the redux store
class SendFriendNoteScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SendFriendNotePage
        usersList={this.props.usersList}
        navigator={this.props.navigator}
        focusedElement={this.props.focusedElement}
        actions={this.props.actions}
        isKeyboardShown={this.props.isKeyboardShown}
        icons={this.props.icons}
        measuresNamesList={this.props.measuresNamesList}
        meProfile={this.props.meProfile}
        userId={this.props.userId}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    lang: state.app.get("lang"),
    usersList: state.user.get("usersList"),
    measuresNamesList: state.measures.get("namesList"),
    meProfile: state.user.get("profile"),
    isKeyboardShown: state.app.get("isKeyboardShown"),
    focusedElement: state.app.get("focusedElement")
  };
}

const actions = [
  measuresActions,
  userActions,
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

export default connect(mapStateToProps, mapDispatchToProps)(SendFriendNoteScreen);
