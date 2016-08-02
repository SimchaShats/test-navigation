import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Easing,
  Animated,
  LayoutAnimation,
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
      filterValue: null,
      bounceValue: new Animated.Value(0)
    }
  }

  componecomponentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.keyboardShow !== this.props.keyboardShow) {
      this.props.navigator.setTitle({
        title: this.props.keyboardShow ? "My Notes" : this.props.measuresNamesList.get(this.state.filterValue)
      });
      Animated.timing(
        this.state.bounceValue,
        {
          toValue: this.props.keyboardShow ? 0 : -135,
          duration: 250
        }
      ).start();
    }
  }

  render() {
    return (
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.bounceValue}]}]}>
        <Filter items={this.props.filterItems} initialValue={this.state.filterValue} updateFilterValue={(filterValue)=>{this.setState({filterValue})}}/>
        {this.props.features && Object.keys(this.props.features).includes("add") && <MyNoteAddRow navigator={this.props.navigator} actionId={this.state.actionId} addAction={this.props.features.add.action} measure={this.state.filterValue}/>}
        <MeasuresList features={this.props.features} measure={this.state.filterValue} measuresNamesList={this.props.measuresNamesList} measuresList={this.props.listItems} actions={this.props.actions}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});