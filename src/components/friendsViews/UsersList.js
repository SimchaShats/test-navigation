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

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.searchCondition && nextProps.usersList) {
      this.setState({dataSource: this.ds.cloneWithRows(
        nextProps.usersList.filter(
          (value, key) => value.get("id") !== nextProps.userProfile.get("id") && nextProps.searchCondition !== ""
           && (value.get("firstName").toLowerCase().includes(nextProps.searchCondition.toLowerCase()) || value.get("lastName").toLowerCase().includes(nextProps.searchCondition.toLowerCase()))).toArray())
      });
    } else {
      this.setState({dataSource: this.ds.cloneWithRows([])});
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
