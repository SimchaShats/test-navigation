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
import {Map} from 'immutable';
import FilteredListView from "../components/FilteredListView";

// this is a traditional React component connected to the redux store
class TheoryScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FFA000'
  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Edit',
        id: 'edit'
      },
      {
        icon: require('../../img/navicon_add.png'),
        title: 'Add',
        id: 'add'
      }
    ]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.actions.getMeasuresTheoryList();
    this.props.actions.getMeasuresNamesList();
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'edit':
        Alert.alert('NavBar', 'Edit button pressed');
        break;

      case 'add':
        Alert.alert('NavBar', 'Add button pressed');
        break;

      default:
        console.log('Unhandled event ' + event.id);
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FilteredListView
          listItems={this.props.measuresTheoryList}
          filterItems={this.props.measuresNamesList}
          measuresNamesList={this.props.measuresNamesList}
          actions={this.props.actions}/>
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
    measuresTheoryList: state.measures.get("theoryList")
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

export default connect(mapStateToProps, mapDispatchToProps)(TheoryScreen);
