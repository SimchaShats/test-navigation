import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  root: undefined // 'login' / 'after-login'
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case types.CHANGE_ROOT:
      return state.merge({
        root: action.root
      });
    default:
      return state;
  }
}
