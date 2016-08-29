/**
 * Created by Simcha on 8/10/16.
 */
const I18n = require("react-native-i18n");
I18n.fallbacks = true;

I18n.translations = {
  en: {
    tabTheory: "Theory",
    tabMyNotes: "Heshbon nefesh",
    tabFriendsNotes: "Friends notes",
    tabSettings: "Settings",
    tabUserProfile: "User profile",
    tabRegister: "Register",
    tabCreateNote: "Create note",

    placeholderAddMyNote: "Type about one of your measures, that you want to improve...",
    placeholderFriendNote: "Type about one of measures about your friend, you want to help him to improve...",
    placeholderFriendName: "Type name one of your friends...",

    headerLogin: "Please login to use this option, or register a new account to use this feature...",
    headerFriendsSearch: "Friends that you want to help them...",

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
    buttonUpdateUserProfile: "Update profile",
    buttonSend: "Send",

    titleMessage: "Message",

    messageSendNoteSuccess: "Note was send successfully",
    messageProfileUpdatedSuccess: "Profile updated successfully"
  },
  ru: {
  tabTheory: "Теория",
    tabMyNotes: "Хэшбон нэфеш",
    tabFriendsNotes: "Заметки друзей",
    tabSettings: "Настройки",
    tabUserProfile: "Профиль",
    tabRegister: "Регистрация",
    tabCreateNote: "Создать заметку",

    placeholderAddMyNote: "Напишите заметку об одном из ваших качеств, которые вы бы хотели улучшить...",
    placeholderFriendNote: "Напишите заметку вашему другу об одном из  качеств, которые вы бы хотели помочь ему улучшить...",
    placeholderFriendName: "Напишите имя вашего дргуга...",

    headerLogin: "Пожалуйста зайдите в систему под вашим аккаунтом, или зарегистрируйтесь чтобы использовать эту опцию...",
    headerFriendsSearch: "Друг, которому вы хотите помочь...",

    fieldEmail: "Электронный адрес",
    fieldPassword: "Пароль",
    fieldConfirmPassword: "Подтверждение пароля",
    fieldBirthDate: "Дата рождения",
    fieldLanguage: "Язык",
    fieldFirstName: "Имя",
    fieldLastName: "Фамилия",

    buttonSignUp: "Зарегистрироваться",
    buttonRegister: "Регистрация",
    buttonSignOut: "Выход",
    buttonSignIn: "Войти",
    buttonUpdateUserProfile: "Редактировать профиль",
    buttonSend: "Послать",

    titleMessage: "Сообщение",

    messageSendNoteSuccess: "Заметка послана успешно",
    messageProfileUpdatedSuccess: "Профиль обноволен успешно"
  },
  he: {
    greeting: "Bonjour!"
  }
};

export default I18n;
