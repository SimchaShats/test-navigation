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
    this.state = {
      keyboardShow: false,
      actionId: null
    };
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardHide.bind(this));
    this.props.actions.getMeasuresMyNotesList();
  }

  keyboardShow(e) {
    //this.props.navigator.toggleNavBar({to: 'hidden', animated: true});
    this.setState({keyboardShow: true});
    this.props.navigator.setButtons({
      rightButtons: [
        {
          icon: require('../../img/navicon_add.png'),
          id: 'add'
        }
      ],
      leftButtons: [
        {
          icon: require('../../img/navicon_menu.png'),
          id: 'cancel'
        }
      ],
      animated: true
    });
  }

  onNavigatorEvent(event) {
    this.setState({actionId: event.id});
  }

  keyboardHide(e) {
    //this.props.navigator.toggleNavBar({to: 'shown', animated: true});
    this.setState({keyboardShow: false});
    this.props.navigator.setButtons({rightButtons: [], leftButtons: []});
  }

  render() {
    return (
      <View style={styles.container}>
        <FilteredListView
          actionId={this.state.actionId}
          navigator={this.props.navigator}
          keyboardShow={this.state.keyboardShow}
          listItems={this.props.measuresMyNotesList}
          filterItems={this.props.measuresNamesList}
          measuresNamesList={this.props.measuresNamesList}
          actions={this.props.actions}
          features={{add: {action: this.props.actions.addMyNote}, remove: {action: this.props.actions.removeMyNote}}}/>
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
