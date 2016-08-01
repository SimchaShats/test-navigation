import React, {Component} from 'react';
import {
  Text,
  ListView,
  View,
  RefreshControl,
  TouchableOpacity,
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
        <View style={styles.textWrapper}><Text style={styles.measureName}>{this.props.measuresNamesList.get(this.props.measure)}: <Text style={styles.text}>{this.props.data}</Text></Text></View>
        {this.props.features && Object.keys(this.props.features).includes("remove") && <TouchableOpacity onPress={this.props.features.remove.action.bind(null, this.props.id)} style={[styles.button]}>
          <Text>Delete</Text>
        </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "gray",
    flexDirection: "row"
  },
  textWrapper: {
    flex: 1
  },
  measureName: {
    fontWeight: "bold"
  },
  text: {
    fontWeight: "normal"
  },
  button: { 
    marginLeft: 15,
    backgroundColor: "red", 
    borderRadius: 5, 
    justifyContent: "center", 
    alignItems: "center", 
    height: 30, 
    width: 85 
  }
});