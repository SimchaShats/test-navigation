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
import UserProfileForm from "../components/UserProfileForm";
import Dimensions from 'Dimensions';
const { Keyboard } = require('react-native');
var Spinner = require('react-native-spinkit');
import I18n from "../i18n";

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getMeasuresMyNotesList();
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    //nextProps.navigator.setTitle({title: I18n.t("tabRegister")});
    if (nextProps.isUserLoggedIn) {
      nextProps.navigator.dismissModal();
    }
    if (nextProps.icons && (nextProps.focusedElement !== this.props.focusedElement|| isComponentDidMount)) {
      if (this.props.focusedElement === "textInputUserProfileForm") {
        const buttonClose = {
          icon: nextProps.icons.clearIcon,
          id: 'close'
        };
        this.props.navigator.setButtons({
          rightButtons: [],
          leftButtons: [],
          animated: true
        });
      } else if (nextProps.focusedElement === "textInputUserProfileForm") {
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

  render() {
    return (
      <View style={styles.container}>
        <UserProfileForm navigator={this.props.navigator}
                         actions={this.props.actions}
                         form={this.props.form}
                         icons={this.props.icons}
                         lang={this.props.lang}
                         userProfile={this.props.userProfile}
                         isClosable={true}
                         buttonDone={I18n.t("buttonSignUp")}
                         doneAction={this.props.actions.signUp}
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
    flex: 1,
    backgroundColor: "white"
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
