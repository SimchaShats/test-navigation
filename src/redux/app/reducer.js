import * as types from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';

const initialState = Map({
  root: null // 'login' / 'after-login'
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_ROOT:
      return state.set("root", action.root);
    default:
      return state;
  }
}
