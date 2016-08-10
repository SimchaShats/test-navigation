import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import store from './redux';
import * as appActions from './redux/app/actions';
import I18n from './i18n';
const { Keyboard } = require('react-native');
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    Keyboard.addListener('keyboardWillShow', () => {
      store.dispatch(appActions.changeKeyboardState())
    });
  }

  onStoreUpdate() {
    const root = store.getState().app.get("root");
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    this._populateIcons().then(() => {
      if (this.currentRoot !== root) {
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
        console.log(error);
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
              screen: 'TheoryScreen',
              icon: theoryIcon,
              navigatorStyle
            },
            {
              screen: 'MyNotesScreen',
              icon: myNotesIcon,
              navigatorStyle
            },
            {
              screen: 'FriendsNotesScreen',
              icon: friendsNotesIcon,
              navigatorStyle
            },
            {
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
