import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Picker
} from 'react-native';
import Filter from "./Filter";
import AddRow from "./AddRow";
import MeasuresList from "./MeasuresList";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: undefined
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Filter items={this.props.filterItems} initialValue={this.state.filterValue} updateFilterValue={(filterValue)=>{this.setState({filterValue})}}/>
        {this.props.features && Object.keys(this.props.features).includes("add") && <AddRow addAction={this.props.features.add.action}/>}
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