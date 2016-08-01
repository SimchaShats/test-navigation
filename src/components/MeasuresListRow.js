import React, {Component} from 'react';
import {
  Text,
  ListView,
  View,
  RefreshControl,
  StyleSheet,
  Picker
} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.measure}>{this.props.measuresNamesList.get(this.props.measure)}: <Text style={styles.text}>{this.props.data}</Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "gray"
  },
  measure: {
    fontWeight: "bold"
  },
  text: {
    fontWeight: "normal"
  }
});