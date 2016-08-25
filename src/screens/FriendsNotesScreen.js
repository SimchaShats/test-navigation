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
import FriendsNotesPage from "../components/FriendsNotesPage";
import LoginForm from "../components/LoginForm";
import Dimensions from 'Dimensions';
const { Keyboard } = require('react-native');
var Spinner = require('react-native-spinkit');
import I18n from "../i18n";

class FriendsNotesScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getMeasuresMyNotesList();
  }

  showRegisterScreen() {
    this.props.navigator.showModal({
      title: I18n.t("tabRegister"),
      screen: "RegisterScreen",
      passProps: {
        icons: this.props.icons
      },
      animationType: "slide-up"
    });
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isUserLoggedIn
          ? <FriendsNotesPage navigator={this.props.navigator}
                              isUserLoggedIn={this.props.isUserLoggedIn}
                              updateList={this.props.actions.getFriendsNotesList.bind(null, this.props.userProfile.get("id"))}
                              focusedElement={this.props.focusedElement}
                              measuresFriendsNotesList={this.props.measuresFriendsNotesList}
                              measuresNamesList={this.props.measuresNamesList}
                              actions={this.props.actions}
                              lang={this.props.lang}
                              icons={this.props.icons}
                              features={{remove: {action: this.props.actions.removeFriendNote}}}/>
          : <LoginForm navigator={this.props.navigator}
                       actions={this.props.actions}
                       focusedElement={this.props.focusedElement}
                       form={this.props.form}
                       icons={this.props.icons}
                       showRegisterScreen={this.showRegisterScreen.bind(this)}
                       header={I18n.t("headerLogin")}/>
        }
        {(this.props.isFetching.get("user") || this.props.isFetching.get("friendNote")) && <View style={styles.overlay}>
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
    lang: state.app.get("lang"),
    userProfile: state.user.get("profile"),
    isUserLoggedIn: state.user.get("isLoggedIn"),
    isFetching: state.app.get("isFetching"),
    focusedElement: state.app.get("focusedElement"),
    form: state.app.get("forms").get("login"),
    measuresNamesList: state.measures.get("namesList"),
    measuresFriendsNotesList: state.measures.get("friendsNotesList")
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendsNotesScreen);
