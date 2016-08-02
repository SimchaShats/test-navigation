import {CHANGE_ROOT, FETCH_REMOTE_DATA} from './actionTypes';
import {OrderedMap, Map, fromJS} from 'immutable';

const initialState = Map({
  root: null,
  isFetching: Map({
    user: false
  })
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_ROOT:
      return state.set("root", action.payload);
    case FETCH_REMOTE_DATA:
      return state.mergeDeepIn(["isFetching"], action.payload);
    default:
      return state;
  }
}
