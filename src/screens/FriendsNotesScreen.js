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

class FriendsNotesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasKeyboardShown: false
    };
  }

  componentWillMount() {
    this.keyboardShow = Keyboard.addListener('keyboardWillShow', this.keyboardShow.bind(this));
    this.keyboardHide = Keyboard.addListener('keyboardWillHide', this.keyboardHide.bind(this));
    this.props.actions.getMeasuresMyNotesList();
  }

  componentWillUnmount() {
    this.keyboardShow.remove();
    this.keyboardHide.remove();
  }

  keyboardShow(e) {
    this.setState({
      hasKeyboardShown: true
    });
  }

  keyboardHide(e) {
    this.setState({
      hasKeyboardShown: false
    });
  }

  showRegisterScreen() {
    this.props.navigator.showModal({
      screen: "RegisterScreen",
      title: "Register",
      animationType: "slide-up"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isUserLoggedIn
          ? <FriendsNotesPage navigator={this.props.navigator}
                              hasKeyboardShown={this.state.hasKeyboardShown}
                              measuresFriendsNotesList={this.props.measuresFriendsNotesList}
                              measuresNamesList={this.props.measuresNamesList}
                              actions={this.props.actions}
                              features={{remove: {action: this.props.actions.removeFriendNote}}}/>
          : <LoginForm navigator={this.props.navigator}
                       actions={this.props.actions}
                       hasKeyboardShown={this.state.hasKeyboardShown}
                       form={this.props.form}
                       showRegisterScreen={this.showRegisterScreen.bind(this)}
                       keyboardShow={this.state.keyboardShow}
                       title="Please sign in to use this option, or register if you don't have an account"/>
        }
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
    isFetching: state.app.get("isFetching"),
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
