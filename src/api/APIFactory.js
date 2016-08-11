/**
 * Created by Simcha on 5/23/16.
 */
"use strict";

import {API_SOURCE} from "../config";
import {API_SOURCES} from "../constants";
import Firebase from "./Firebase";
import AsyncStorage from "./AsyncStorage";
import Local from "./Local";

export default function APIFactory(apiType) {
  apiType = apiType || API_SOURCE;
  switch (apiType) {
    case API_SOURCES.FIREBASE:
      return new Firebase();
    case API_SOURCES.ASYNC_STORAGE:
      return new AsyncStorage();
    case API_SOURCES.LOCAL:
      return new Local();
    default:
      return new Firebase();
  }
}