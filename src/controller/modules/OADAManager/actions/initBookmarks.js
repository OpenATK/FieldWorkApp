import oada from "@oada/cerebral-module/sequences";
import { moduleState, state, props } from "cerebral";
import { set, when } from 'cerebral/factories'

import tree from '../tree';

function createFieldsResource() {
  let requests = [{
    tree,
    data: {},
    path: '/bookmarks/fields'
  }];
  return {requests};
}
function createSeasonsResource() {
  let requests = [{
    tree,
    data: {},
    path: '/bookmarks/seasons'
  }];
  return {requests};
}

export default [
  when(state`oada.${moduleState`currentConnection`}.bookmarks.fields`),
  {
    true: [],
    false: [
      createFieldsResource,
      set(props`type`, undefined),
      oada.put,
    ]
  },
  when(state`oada.${moduleState`currentConnection`}.bookmarks.seasons`),
  {
    true: [],
    false: [
      createSeasonsResource,
      set(props`type`, undefined),
      oada.put
    ]
  }
]
