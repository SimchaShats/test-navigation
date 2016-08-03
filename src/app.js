import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import store from './redux';
import * as appActions from './redux/app/actions';

// screen related book keeping
import { registerScreens } from './screens';
registerScreens(store, Provider);

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
  }

  onStoreUpdate() {
    const root = store.getState().app.get("root");
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot !== root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'main':
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Theory',
              screen: 'TheoryScreen',
              icon: require('../img/one.png'),
              selectedIcon: require('../img/one_selected.png'),
              title: 'Theory',
              navigatorStyle: {
                statusBarColor: '#303F9F',
                toolBarColor: '#3F51B5',
                navigationBarColor: '#303F9F',
                tabSelectedTextColor: '#FFA000',
                tabNormalTextColor: '#FFC107',
                tabIndicatorColor: '#FFA000'
              }
            },
            {
              label: 'My notes',
              screen: 'MyNotesScreen',
              icon: require('../img/two.png'),
              selectedIcon: require('../img/two_selected.png'),
              title: 'My notes',
              navigatorStyle: {
                statusBarColor: '#303F9F',
                toolBarColor: '#3F51B5',
                navigationBarColor: '#303F9F',
                tabSelectedTextColor: '#FFA000',
                tabNormalTextColor: '#FFC107',
                tabIndicatorColor: '#FFA000'
              }
            },
            {
              label: 'Friends notes',
              screen: 'FriendsNotesScreen',
              icon: require('../img/two.png'),
              selectedIcon: require('../img/two_selected.png'),
              title: 'Friends notes',
              navigatorStyle: {
                statusBarColor: '#303F9F',
                toolBarColor: '#3F51B5',
                navigationBarColor: '#303F9F',
                tabSelectedTextColor: '#FFA000',
                tabNormalTextColor: '#FFC107',
                tabIndicatorColor: '#FFA000'
              }
            }
          ],
          passProps: {
          },
          animationType: 'slide-down',
          title: 'Redux Example'
        });
        return;
      default:
        console.error('Unknown app root');
    }
  }
}
