import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Picker
} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._componentWillUpdateProps(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this._componentWillUpdateProps(nextProps);
  }

  _componentWillUpdateProps(nextProps, isComponentDidMount = false) {
    if (nextProps.items && (nextProps.items !== this.props.items || isComponentDidMount)) {
      this.props.updateFilterValue(Object.keys(nextProps.items)[0]);
    }
  }

  getPickerItems() {
    let pickerItems = [];
    for (let i in this.props.items) {
      pickerItems.push(<Picker.Item key={`_${Date.now()}`} label={this.props.items[i]} value={i}/>);
    }
    return pickerItems;
  }

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={this.props.initialValue}
          onValueChange={this.props.updateFilterValue}>
          {this.getPickerItems()}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === "android" ? 15 : 0,
    backgroundColor: "#3F51B5",
    overflow: "hidden"
  },
  picker: {
    top: -40,
    height: 135
  }
});