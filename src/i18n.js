/**
 * Created by Simcha on 8/10/16.
 */
const I18n = require("react-native-i18n");
I18n.fallbacks = true;

I18n.translations = {
  en: {
    tabTheory: "Theory",
    tabMyNotes: "My notes",
    tabFriendsNotes: "Friends notes",
    tabSettings: "Settings",
    tabUserProfile: "User profile",
    tabRegister: "Register",
    tabCreateNote: "Create note",

    placeholderAddMyNote: "Type about one of your measures...",
    placeholderFriendNote: "Type about one of measures about your friend, you want to help him to improve...",
    placeholderFriendName: "Type name one of your friends...",

    headerLogin: "Please login to use this option, or register a new account",
    headerFriendsSearch: "Friends that you want to help him...",

    fieldEmail: "Email",
    fieldPassword: "Password",
    fieldConfirmPassword: "Confirm password",
    fieldBirthDate: "Birth date",
    fieldLanguage: "Language",
    fieldFirstName: "First Name",
    fieldLastName: "Last Name",

    buttonSignUp: "Sign Up",
    buttonRegister: "Register",
    buttonSignOut: "Sign Out",
    buttonSignIn: "Sign In",
    buttonUpdateProfile: "Update profile",
    buttonSend: "Send"
  },
  ru: {
    tabTheory: "Теория",
  },
  he: {
    greeting: "Bonjour!"
  }
};

export default I18n;
