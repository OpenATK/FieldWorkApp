/*
  Get amount of acres, planned, started and done.
*/

import { state } from 'cerebral'
import _ from 'lodash';
import geojsonArea from '@mapbox/geojson-area';
import operationFields from './operationFields';
import seasonFields from './seasonFields';

export default function acresStatus (get) {
  //Get id's of all fields in this operation
  let fieldOperations = operationFields(get);
  let fieldsSeason = seasonFields(get);
  //Loop through each field, totaling acres.
  let planned = 0;
  let started = 0;
  let done = 0;
  _.forEach(fieldOperations, (fieldOperation, key) => {
    //Get field
    let field = fieldsSeason[key];
    if (field == null) return;
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
  let total = planned + started + done;
  return {
    planned: Math.round(planned),
    plannedPercentage: Math.round((planned / (total || 1)) * 100),
    started: Math.round(started),
    startedPercentage: Math.round((started / (total || 1)) * 100),
    done: Math.round(done),
    donePercentage: Math.round((done / (total || 1)) * 100),
  };
}
