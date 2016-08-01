import React, {Component, PropTypes} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as measuresActions from '../redux/measures/actions';
import {Map} from 'immutable';
import FilteredListView from "../components/FilteredListView";
const { Keyboard } = require('react-native');

// this is a traditional React component connected to the redux store
class MyNotesScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    statusBarHidden: true,
    tabIndicatorColor: '#FFA000'
  };

  constructor(props) {
    super(props);
  }


  componentWillMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    this.props.actions.getMeasuresMyNotesList();
  }

  keyboardDidShow(e) {
    this.props.navigator.toggleNavBar({to: 'hidden',
      animated: true});
  }

  keyboardDidHide(e) {
    this.props.navigator.toggleNavBar({to: 'shown',
      animated: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <FilteredListView
          listItems={this.props.measuresMyNotesList}
          filterItems={this.props.measuresNamesList}
          measuresNamesList={this.props.measuresNamesList}
          actions={this.props.actions}
          features={{add: {action: this.props.actions.addMyNote}}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {
    measuresNamesList: state.measures.get("namesList"),
    measuresMyNotesList: state.measures.get("myNotesList")
  };
}

const actions = [
  measuresActions
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

export default connect(mapStateToProps, mapDispatchToProps)(MyNotesScreen);
