/*
  - Create new id for operation
  - Copy fields from master fields list
*/


import { set, when } from 'cerebral/factories'
import { moduleState, state, props } from "cerebral";
import _ from 'lodash';
import uuid from 'uuid/v1'
import oada from "@oada/cerebral-module/sequences";
import tree from '../../../OADAManager/tree'

function createOperation({get, props}) {
  var operation = {
    id: uuid(),
    year: '2019',
    name: get(moduleState`name`),
    fields: {}
  }
  return {operation};
}

function addOperationToLocalData({store, props}) {
  let operation = props.operation;
  store.set(state`localData.abc123.seasons.2019.operations.${operation.id}`, operation); //TODO year, organization
}
function addOperationToOADA({props}) {
  let operation = props.operation;
  //Add to OADA
  let requests = [
    {
      tree,
      data: operation,
      path: `/bookmarks/seasons/2019/operations/${operation.id}` //TODO year
    }
  ];
  return {requests, connection_id: 'localhost'}; //TODO connection_id
}

export default [
  createOperation,
  when(state`OADAManager.connected`),
  {
    true: [
      addOperationToOADA,
      oada.put
    ],
    false: [
      addOperationToLocalData
    ]
  },
  set(state`TopBar.OperationDropdown.selected`, props`operation.id`)
]
