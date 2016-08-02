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
import {Map} from 'immutable';
import FilteredListView from "../components/measuresViews/FilteredListView";
import Login from "../components/Login";
import Dimensions from 'Dimensions';
const { Keyboard } = require('react-native');
var Spinner = require('react-native-spinkit');

class FriendsNotesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visibleHeight: Dimensions.get('window').height,
      keyboardShow: false
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
      visibleHeight: Dimensions.get('window').height - e.endCoordinates.height,
      keyboardShow: true
    });
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon: require('../../img/navicon_add.png'),
          id: 'add'
        }
      ],
      leftButtons: [],
      animated: true
    });
  }

  keyboardHide(e) {
    this.setState({
      keyboardShow: false,
      visibleHeight: Dimensions.get('window').height
    });
    this.props.navigator.setButtons({rightButtons: [], leftButtons: []});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isUserLoggedIn
          ? <View/>
          : <Login navigator={this.props.navigator}
                   visibleHeight={this.state.visibleHeight}
                   actions={this.props.actions}
                   keyboardShow={this.state.keyboardShow}
                   title="Please signIn to use this option..."/>
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
    isFetching: state.app.get("isFetching")
  };
}

const actions = [
  measuresActions,
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
