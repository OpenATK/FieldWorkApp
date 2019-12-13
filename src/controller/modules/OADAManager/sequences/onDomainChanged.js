import connect from '../actions/connect';
import fetchAndWatch from '../actions/fetchAndWatch';
import initBookmarks from '../actions/initBookmarks';
import { set } from 'cerebral/factories'
import { moduleState, props } from "cerebral";


export default [
  connect,
  fetchAndWatch,
  initBookmarks,
  set(moduleState`connected`, true)
]
