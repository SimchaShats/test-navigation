"use strict";

import React, {Component} from 'react';
import {
  Text,
  ListView,
  RefreshControl,
  Picker
} from 'react-native';
import MeasuresRow from "../components/MeasuresListRow";

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
    let filteredMeasuresList = {};
    if (nextProps.measure === "all") {
      filteredMeasuresList = nextProps.measuresList;
    } else {
      for (let i in nextProps.measuresList) {
        (nextProps.measuresList[i].measure === nextProps.measure) && (filteredMeasuresList[i] = nextProps.measuresList[i]);
      }
      //props.measuresList.filter((item) => item.measure === props.measure);
    }
    this.setState({dataSource: this.ds.cloneWithRows(filteredMeasuresList)});
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <MeasuresRow measuresNamesList={this.props.measuresNamesList} measure={rowData.measure} data={rowData.data}/>}
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
