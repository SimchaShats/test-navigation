"use strict";
import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as measuresActions from '../redux/measures/actions';
import * as userActions from '../redux/user/actions';
import * as appActions from '../redux/app/actions';
import {Map} from 'immutable';
import FilteredMeasuresView from "../components/measuresViews/FilteredMeasuresView";
import UserProfileForm from "../components/UserProfileForm";
import I18n from "../utils/i18n";
import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';

// this is a traditional React component connected to the redux store
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
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeableViews style={styles.slideContainer}>
          <View style={[styles.slide]}>
            <UserProfileForm navigator={this.props.navigator}
                             actions={this.props.actions}
                             form={this.props.form}
                             formName={this.props.formName}
                             icons={this.props.icons}
                             userProfile={this.props.userProfile}
                             lang={this.props.lang}
                             isKeyboardShown={this.props.isKeyboardShown}
                             buttonDone={this.props.buttonDone}
                             doneAction={this.props.doneAction}
                             focusedElement={this.props.focusedElement}
                             isFetching={this.props.isFetching}/>
          </View>
          {/*<View style={[styles.slide]}>
          </View>*/}
        </SwipeableViews>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slideContainer: {
    flex: 1
  },
  slide: {
    flex: 1
  }
});