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
import FilteredMeasuresView from "../components/measuresViews/FilteredMeasuresView";
import I18n from "../i18n";

// this is a traditional React component connected to the redux store
class TheoryScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getMeasuresTheoryList();
    this.props.actions.getMeasuresNamesList();
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    nextProps.navigator.setTitle({title: I18n.t("tabTheory")});
  }

  render() {
    return (
        <FilteredMeasuresView
          updateList={this.props.actions.getMeasuresTheoryList}
          measuresList={this.props.measuresTheoryList}
          measuresNamesList={this.props.measuresNamesList}
          actions={this.props.actions}
          icons={this.props.icons}/>
    );
  }
}

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
