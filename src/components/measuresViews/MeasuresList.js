"use strict";

import React, {Component} from 'react';
import {
  Text,
  ListView,
  RefreshControl,
  Picker
} from 'react-native';
import MeasuresListRow from "./MeasuresListRow";

export default class extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: this.ds.cloneWithRows([])
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.updateList().then(() => {
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
    if (nextProps.measure && nextProps.measuresList) {
      this.setState({dataSource: this.ds.cloneWithRows(nextProps.measuresList.filter((value, key) => value.get("measure") === nextProps.measure || nextProps.measure === "all").toArray())});
    }
  }

  render() {
    return (
      <ListView
        style={this.props.style}
        dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => <MeasuresListRow lang={this.props.lang} features={this.props.features} measuresNamesList={this.props.measuresNamesList} measure={rowData.get("measure")} message={rowData.get("message")} id={rowData.get("id")}/>}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      />
    );
  }
}
