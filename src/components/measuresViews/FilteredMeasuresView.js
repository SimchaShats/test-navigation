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
import NoteAddRow from "./../UI/NoteAddRow";
import MeasuresList from "./MeasuresList";
import {OrderedMap, Map} from 'immutable';
import I18n from "../../i18n";

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
    if (nextProps.focusedElement !== this.props.focusedElement || isComponentDidMount) {
      if (nextProps.focusedElement === "textInputNoteAddRow") {
        Animated.timing(
          this.state.bounceValue,
          {
            toValue: -135,
            duration: 250
          }
        ).start();
      } else if (this.props.focusedElement === "textInputNoteAddRow") {
        Animated.timing(
          this.state.bounceValue,
          {
            toValue: 0,
            duration: 250
          }
        ).start();
      }
    }
  }

  render() {
    return (
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.bounceValue}]}]}>
        <Filter items={this.props.measuresNamesList} initialValue={this.state.filterValue}
                updateFilterValue={(filterValue)=>{this.setState({filterValue})}}/>
        {this.props.features && Object.keys(this.props.features).includes("add") &&
        <NoteAddRow actions={this.props.actions} navigator={this.props.navigator}
                    focusedElement={this.props.focusedElement} icons={this.props.icons}
                    placeholder={I18n.t("placeholderAddMyNote")}
                    doneAction={this.props.features.add.action} measure={this.state.filterValue}/>}
        <MeasuresList features={this.props.features} updateList={this.props.updateList} measure={this.state.filterValue}
                      measuresNamesList={this.props.measuresNamesList} measuresList={this.props.measuresList}
                      actions={this.props.actions}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});