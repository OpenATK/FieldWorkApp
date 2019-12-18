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
import getSeasonField from '../../../../helpers/getSeasonField';


function isEditing({get, path}) {
  let editingField = get(state`Map.editingField`);
  if (editingField == null) return path.false();
  return path.true({editingField});
}
function convertToGEOJSON({get}) {
  const points = get(state`Map.BoundaryDrawing.boundary`)
  var boundary = {
    type: "Polygon",
    "coordinates": [_.map(points, (p) => {return [p[1], p[0]]})] //Flip lat/lng and add array around
  }
  return {boundary}
}
function getChanges({get, props, store}) {
  //See if name or boundary has changed
  let field = getSeasonField(get, props.editingField);
  let newName = get(moduleState`name`);
  let newBoundary = props.boundary;
  var changes = {};
  if (newName != field.name) changes.name = newName;
  if (_.isEqual(newBoundary,field.boundary) == false) changes.boundary = newBoundary;
  return {changes};
}
function saveChangesToLocalData({store, props, get}) {
  if (_.isEmpty(props.changes)) return;
  store.merge(state`localData.abc123.fields.${props.editingField}`, props.changes); //TODO organization
  store.merge(state`localData.abc123.seasons.2019.fields.${props.editingField}`, props.changes); //TODO year, organization
}
function saveChangesToOADA({props, get}) {
  if (_.isEmpty(props.changes)) return;
  //Add to OADA
  let requests = [
    {
      tree,
      data: props.changes,
      path: `/bookmarks/fields/fields/${props.editingField}`
    },
    {
      tree,
      data: props.changes,
      path: `/bookmarks/seasons/2019/fields/${props.editingField}` //TODO year
    }
  ];
  let currentConnection = get(state`OADAManager.currentConnection`)
  return {requests, connection_id: currentConnection};
}
function createFarm({get, props}) {
  var farm = {
    id: uuid(),
    name: get(moduleState`name`) + '_Farm'
  }
  return {farm}
}
function createField({get, props}) {
  var field = {
    id: uuid(),
    name: get(moduleState`name`),
    boundary: props.boundary,
    farm: {
      _id: _.get(props, 'responses.0.headers.location').substr(1)
    }
  }
  return {field}
}
function addFieldToLocalData({store, props, get}) {
  let farm = props.farm;
  let field = props.field;
  store.set(state`localData.abc123.farms.${farm.id}`, farm); //TODO organization
  store.set(state`localData.abc123.fields.${field.id}`, field); //TODO organization
  store.set(state`localData.abc123.seasons.2019.fields.${field.id}`, {...field, operations: {}, year: '2019'}); //TODO year, organization
}
function addFarmToOADA({props, get}) {
  let farm = props.farm;
  //Add to OADA
  let requests = [
    {
      tree,
      data: farm,
      path: `/bookmarks/fields/farms/${farm.id}`
    }
  ];
  let currentConnection = get(state`OADAManager.currentConnection`)
  return {requests, connection_id: currentConnection};
}
function addFieldToOADA({props, get}) {
  let field = props.field;
  //Add to OADA
  let requests = [
    {
      tree,
      data: field,
      path: `/bookmarks/fields/fields/${field.id}`
    },
    {
      tree,
      data: {...field, operations: {}, year: '2019'}, //TODO year
      path: `/bookmarks/seasons/2019/fields/${field.id}` //TODO year
    }
  ];
  let currentConnection = get(state`OADAManager.currentConnection`)
  return {requests, connection_id: currentConnection};
}

export default [
  convertToGEOJSON,
  isEditing,
  {
    true: [
      getChanges,
      when(state`OADAManager.connected`),
      {
        true: [
          saveChangesToOADA,
          oada.put
        ],
        false: [
          saveChangesToLocalData
        ]
      }
    ],
    false: [
      createFarm,
      when(state`OADAManager.connected`),
      {
        true: [
          addFarmToOADA,
          oada.put,
          createField,
          addFieldToOADA,
          oada.put
        ],
        false: [
          addFieldToLocalData
        ]
      }
    ]
  }
]
