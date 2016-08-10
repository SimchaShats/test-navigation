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
import * as appActions from '../redux/app/actions';
import {Map} from 'immutable';
import FilteredMeasuresView from "../components/measuresViews/FilteredMeasuresView";
import I18n from "../i18n";

// this is a traditional React component connected to the redux store
class MyNotesScreen extends Component {

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
    nextProps.navigator.setTitle({title: I18n.t("tabMyNotes")});
  }

  render() {
    return (
        <FilteredMeasuresView
          updateList={this.props.actions.getMeasuresMyNotesList}
          navigator={this.props.navigator}
          measuresList={this.props.measuresMyNotesList}
          filterItems={this.props.measuresNamesList}
          measuresNamesList={this.props.measuresNamesList}
          focusedElement={this.props.focusedElement}
          actions={this.props.actions}
          icons={this.props.icons}
          features={{add: {action: this.props.actions.addMyNote}, remove: {action: this.props.actions.removeMyNote}}}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    measuresNamesList: state.measures.get("namesList"),
    focusedElement: state.app.get("focusedElement"),
    measuresMyNotesList: state.measures.get("myNotesList")
  };
}

const actions = [
  appActions,
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
