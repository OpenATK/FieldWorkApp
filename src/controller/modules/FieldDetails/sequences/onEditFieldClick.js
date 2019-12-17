import { sequences, props, state } from "cerebral";
import { set } from 'cerebral/factories'
import field from '../computed/field';
import _ from 'lodash';
import uuid from 'uuid/v1'

function getCurrentField({get}) {
  //Get current field boundary
  return {currentField: field(get)};
}

function convertBoundaryAndStartDrawing({get, props}) {
  //Convert to drawing boundary: {<rand-id>: [lat, lng], ...}
  let boundary = {};
  _.forEach(_.get(props.currentField, 'boundary.coordinates.0') || [], (coors) => { //TODO will not work with holes in fields etc
    boundary[uuid()] = [coors[1], coors[0]];
  });
  //Hide current field boundary from map
  get(sequences`Map.BoundaryDrawing.onStartDrawing`)({boundary})
}

function unselectField({get}) {
  get(sequences`Map.unselectField`)()
}

export default [
  getCurrentField,
  set(state`Map.editingField`, props`currentField.id`),
  convertBoundaryAndStartDrawing,
  unselectField
]
