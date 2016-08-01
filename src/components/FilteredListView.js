import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Picker
} from 'react-native';
import Filter from "./Filter";
import MyNoteAddRow from "./MyNoteAddRow";
import MeasuresList from "./MeasuresList";
import {OrderedMap, Map} from 'immutable';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: OrderedMap
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Filter items={this.props.filterItems} initialValue={this.state.filterValue} updateFilterValue={(filterValue)=>{this.setState({filterValue})}}/>
        {this.props.features && Object.keys(this.props.features).includes("add") && <MyNoteAddRow addAction={this.props.features.add.action} measure={this.state.filterValue}/>}
        <MeasuresList measure={this.state.filterValue} measuresNamesList={this.props.measuresNamesList} measuresList={this.props.listItems} actions={this.props.actions}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});