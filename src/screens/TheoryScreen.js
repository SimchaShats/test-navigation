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
import FilteredListView from "../components/measuresViews/FilteredListView";

// this is a traditional React component connected to the redux store
class TheoryScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getMeasuresTheoryList();
    this.props.actions.getMeasuresNamesList();
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
