/*
  - Create new id for operation
  - Copy fields from master fields list
*/


import { set } from 'cerebral/factories'
import { moduleState, state, props } from "cerebral";
import _ from 'lodash';
import uuid from 'uuid/v1'


function createOperation({get, store, props}) {
  var operation = {
    id: uuid(),
    year: '2019',
    name: get(moduleState`name`),
    fields: {}
  }
  store.set(state`operations.2019.${operation.id}`, operation);
  return {id: operation.id};
}
export default [
  createOperation,
  set(state`TopBar.OperationDropdown.selected`, props`id`)
]
