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
import Button from "./../UI/Button";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={[styles.container, {flexDirection: this.props.lang === "he" ? "row-reverse" : "row"}]}>
        <View style={styles.textWrapper}>
          <Text style={[styles.measureName, {textAlign: this.props.lang === "he" ? "right" : "left"}]}>{this.props.measuresNamesList.get(this.props.measure) + ": "}
            <Text style={styles.text}>{this.props.message}</Text>
          </Text>
        </View>
        {this.props.features && Object.keys(this.props.features).includes("remove") &&
        <TouchableOpacity onPress={this.props.features.remove.action.bind(null, this.props.id)}><Icon name="delete" size={30} color="gray"/></TouchableOpacity>
        //<Button style={{marginLeft: 15, backgroundColor: "red"}}
        //        onPress={this.props.features.remove.action.bind(null, this.props.id)}>Delete</Button>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "gray"
  },
  textWrapper: {
    flex: 1
  },
  measureName: {
    fontWeight: "bold"
  },
  text: {
    fontWeight: "normal"
  }
});