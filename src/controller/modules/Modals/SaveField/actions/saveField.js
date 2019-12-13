/*
  - Convert field from boundary drawing to GEOJSON
  - Push new field to main field list
  - Push new field to all operations in the current year
*/

import { state, moduleState } from "cerebral";
import { set, when } from 'cerebral/factories'
import _ from 'lodash';
import uuid from 'uuid/v1'
import oada from "@oada/cerebral-module/sequences";
import tree from "../../../OADAManager/tree";

function convertToGEOJSON({get}) {
  const points = get(state`Map.BoundaryDrawing.boundary`)
  var boundary = {
    type: "Polygon",
    "coordinates": [_.map(points, (p) => {return [p[1], p[0]]})] //Flip lat/lng and add array around
  }
  return {boundary}
}
function createField({get, props}) {
  var field = {
    id: uuid(),
    name: get(moduleState`name`),
    boundary: props.boundary
  }
  console.log('NewField', JSON.stringify(field, 2));
  return {field}
}
function addFieldToLocalData({store, props, get}) {
  let field = props.field;
  store.set(state`localData.abc123.fields.${field.id}`, field); //TODO organization
  store.set(state`localData.abc123.seasons.2019.fields.${field.id}`, {...field, operations: {}, year: '2019'}); //TODO year, organization
}
function addFieldToOADA({props, get}) {
  let field = props.field;
  //Add to OADA
  let requests = [
    {
      tree,
      data: field,
      path: `/bookmarks/fields/${field.id}`
    },
    {
      tree,
      data: {...field, operations: {}, year: '2019'},
      path: `/bookmarks/seasons/2019/fields/${field.id}`
    }
  ];
  let currentConnection = get(state`OADAManager.currentConnection`)
  return {requests, connection_id: currentConnection};
}

export default [
  convertToGEOJSON,
  createField,
  when(state`OADAManager.connected`),
  {
    true: [
      addFieldToOADA,
      oada.put
    ],
    false: [
      addFieldToLocalData
    ]
  }
]
