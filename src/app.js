"use strict";
import React, {Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import store from './redux';
import * as appActions from './redux/app/actions';
import I18n from './utils/i18n';
const { Keyboard } = require('react-native');
import Icon from 'react-native-vector-icons/MaterialIcons';
import CodePush from "react-native-code-push";
import { CODE_PUSH } from "./constants";
import {
  Platform,
} from 'react-native';

var theoryIcon;
var myNotesIcon;
var friendsNotesIcon;
var checkIcon;
var doneIcon;
var replyIcon;
var createIcon;
var clearIcon;
var settingsIcon;

// screen related book keeping
import { registerScreens } from './screens';
registerScreens(store, Provider);

const navigatorStyle = {
  statusBarColor: '#303F9F',
  toolBarColor: '#3F51B5',
  navigationBarColor: '#303F9F',
  tabSelectedTextColor: '#FFA000',
  tabNormalTextColor: '#FFC107',
  tabIndicatorColor: '#FFA000'
};

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
    Keyboard.addListener('keyboardDidShow', () => {
      store.dispatch(appActions.changeKeyboardState(true))
    });
    Keyboard.addListener('keyboardDidHide', () => {
      store.dispatch(appActions.changeKeyboardState(false))
    });
    CodePush.sync({
        deploymentKey: Platform.OS === "ios" ? CODE_PUSH.IOS.STAGING : CODE_PUSH.ANDROID.STAGING,
        installMode: CodePush.InstallMode.IMMEDIATE
      },
      (syncStatus) => {
        store.dispatch(appActions.syncCodePush(syncStatus));
      }, (progress) => {
        store.dispatch(appActions.updateCodePush(progress));
      });
  }

  onStoreUpdate() {
    const root = store.getState().app.get("root");
    const lang = store.getState().app.get("lang");

    this._populateIcons().then(() => {
      if ((this.currentRoot !== root || this.lang !== lang) && lang !== null) {
        this.lang = lang;
        this.currentRoot = root;
        this.startApp(root);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  _populateIcons = function () {
    return new Promise(function (resolve, reject) {
      Promise.all(
        [
          Icon.getImageSource('reorder', 30),
          Icon.getImageSource('content-copy', 30),
          Icon.getImageSource('group', 30),
          Icon.getImageSource('done', 30),
          Icon.getImageSource('reply', 30),
          Icon.getImageSource('create', 25),
          Icon.getImageSource('clear', 30),
          Icon.getImageSource('tune', 30)
        ]
      ).then((values) => {
        theoryIcon = values[0];
        myNotesIcon = values[1];
        friendsNotesIcon = values[2];
        doneIcon = values[3];
        replyIcon = values[4];
        createIcon = values[5];
        clearIcon = values[6];
        settingsIcon = values[7];
        resolve(null);
      }).catch((error) => {
        reject(error);
      }).done();
    });
  };


  startApp(root) {
    switch (root) {
      case 'main':
        Navigation.startTabBasedApp({
          tabs: [
            {
              title: I18n.t("tabMyNotes"),
              label: I18n.t("tabMyNotes"),
              screen: 'MyNotesScreen',
              icon: myNotesIcon,
              navigatorStyle
            },
            {
              title: I18n.t("tabTheory"),
              label: I18n.t("tabTheory"),
              screen: 'TheoryScreen',
              icon: theoryIcon,
              navigatorStyle
            },
            {
              title: I18n.t("tabFriendsNotes"),
              label: I18n.t("tabFriendsNotes"),
              screen: 'FriendsNotesScreen',
              icon: friendsNotesIcon,
              navigatorStyle
            },
            {
              title: I18n.t("tabSettings"),
              label: I18n.t("tabSettings"),
              screen: 'SettingsScreen',
              icon: settingsIcon,
              navigatorStyle
            }
          ],
          animationType: 'slide-down',
          passProps: {
            icons: {
              checkIcon,
              doneIcon,
              createIcon,
              clearIcon,
              replyIcon
            }
          }
        });
        return;
      default:
        console.error('Unknown app root');
    }
  }
}
