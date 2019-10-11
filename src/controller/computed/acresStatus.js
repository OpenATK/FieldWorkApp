/*
  Get amount of acres, planned, started and done.
*/

import { state } from 'cerebral'
import _ from 'lodash';
import geojsonArea from '@mapbox/geojson-area';
import {selectedOperation} from '../modules/TopBar/modules/OperationDropdown/computed/operations.js';
import fields from './fields';

export default function acresStatus (get) {
  //Get the selected operation
  let operation = selectedOperation(get);  //Grabbing the computed from the state does not work here. Not sure why. See: https://github.com/cerebral/cerebral/issues/1397
  //Get id's of all fields in this operation
  let fieldOperations = _.get(operation, 'fields') || [];
  //Loop through each field, totaling acres.
  let planned = 0;
  let started = 0;
  let done = 0;
  return {planned, started, done};
  _.forEach(fieldOperations, (fieldOperation, key) => {
    //Get field
    let field = get(state`localData.abc123.seasons.2019.fields.${key}`)  //TODO year, organization
    //Compute area of field boundary
    let area = geojsonArea.geometry(field.boundary) * 0.000247105 //Meters to acres;
    if (fieldOperation.status == 'planned') {
      planned += area;
    } else if (fieldOperation.status == 'started') {
      started += area;
    } else if (fieldOperation.status == 'done') {
      done += area;
    }
  });
  return {planned, started, done};
}
