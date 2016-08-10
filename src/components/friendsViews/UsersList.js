"use strict";

import React, {Component} from 'react';
import {
  Text,
  ListView,
  RefreshControl,
  Picker
} from 'react-native';
import UsersListRow from "./UsersListRow";

export default class extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([])
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.actions.getMeasuresTheoryList().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.searchCondition && nextProps.usersList) {
      this.setState({dataSource: this.ds.cloneWithRows(nextProps.usersList.filter((value, key) => value.get("firstName").includes(nextProps.searchCondition) || value.get("lastName").includes(nextProps.searchCondition)).toArray())});
    }
  }

  render() {
    return (
      <ListView
        keyboardShouldPersistTaps={true}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => <UsersListRow focusedElement={this.props.focusedElement} profile={rowData} navigator={this.props.navigator}
        icons={this.props.icons}/>}
      />
    );
  }
}
