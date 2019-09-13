/*
  - Convert field from boundary drawing to GEOJSON
  - Push new field to main field list
  - Push new field to all operations in the current year
*/

import { state, moduleState } from "cerebral";
import _ from 'lodash';
import uuid from 'uuid/v1'

function convertToGEOJSON({get}) {
  const points = get(state`Map.BoundaryDrawing.boundary`)
  var boundary = {
    type: "Polygon",
    "coordinates": [_.map(points, (p) => {return [p[1], p[0]]})] //Flip lat/lng and add array around
  }
  return {boundary}
}

function createField({store, props, get}) {
  var field = {
    id: uuid(),
    name: get(moduleState`name`),
    boundary: props.boundary
  }
  console.log('NewField', JSON.stringify(field, 2));
  store.set(state`fields.${field.id}`, field);
  store.set(state`season.2019.fields.${field.id}`, {...field, operations: {}, year: '2019'}); //TODO year
}


export default [
  convertToGEOJSON,
  createField
]
