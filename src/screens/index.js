import {Navigation} from 'react-native-navigation';

import TheoryScreen from './TheoryScreen';
import MyNotesScreen from './MyNotesScreen';
import FriendsNotesScreen from './FriendsNotesScreen';
import PushedScreen from './PushedScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('measures.TheoryScreen', () => TheoryScreen, store, Provider);
  Navigation.registerComponent('measures.MyNotesScreen', () => MyNotesScreen, store, Provider);
  Navigation.registerComponent('measures.FriendsNotesScreen', () => FriendsNotesScreen, store, Provider);
}
