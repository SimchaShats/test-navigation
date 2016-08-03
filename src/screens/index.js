import {Navigation} from 'react-native-navigation';

import TheoryScreen from './TheoryScreen';
import MyNotesScreen from './MyNotesScreen';
import FriendsNotesScreen from './FriendsNotesScreen';
import RegisterScreen from './RegisterScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('TheoryScreen', () => TheoryScreen, store, Provider);
  Navigation.registerComponent('MyNotesScreen', () => MyNotesScreen, store, Provider);
  Navigation.registerComponent('RegisterScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('FriendsNotesScreen', () => FriendsNotesScreen, store, Provider);
}
