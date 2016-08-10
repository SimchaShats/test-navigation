import {Navigation} from 'react-native-navigation';

import TheoryScreen from './TheoryScreen';
import MyNotesScreen from './MyNotesScreen';
import CreateFriendNoteScreen from './CreateFriendNoteScreen';
import FriendsNotesScreen from './FriendsNotesScreen';
import RegisterScreen from './RegisterScreen';
import UserProfileScreen from './UserProfileScreen';
import SettingsScreen from './SettingsScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('TheoryScreen', () => TheoryScreen, store, Provider);
  Navigation.registerComponent('MyNotesScreen', () => MyNotesScreen, store, Provider);
  Navigation.registerComponent('CreateFriendNoteScreen', () => CreateFriendNoteScreen, store, Provider);
  Navigation.registerComponent('UserProfileScreen', () => UserProfileScreen, store, Provider);
  Navigation.registerComponent('RegisterScreen', () => RegisterScreen, store, Provider);
  Navigation.registerComponent('FriendsNotesScreen', () => FriendsNotesScreen, store, Provider);
  Navigation.registerComponent('SettingsScreen', () => SettingsScreen, store, Provider);
}
