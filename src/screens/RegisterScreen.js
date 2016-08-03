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
import RegisterForm from "../components/RegisterForm";
import Dimensions from 'Dimensions';
const { Keyboard } = require('react-native');
var Spinner = require('react-native-spinkit');

class RegisterScreen extends Component {
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

  showRegisterForm() {
    this.props.navigator.showModal({
      screen: {}
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <RegisterForm navigator={this.props.navigator}
                      actions={this.props.actions}
                      form={this.props.form}
                      hasKeyboardShown={this.state.hasKeyboardShown}/>
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
    form: state.app.get("forms").get("register"),
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
