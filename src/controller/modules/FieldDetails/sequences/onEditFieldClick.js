import { sequences } from "cerebral";
import field from '../computed/field';
import _ from 'lodash';
import uuid from 'uuid/v1'

function onEditFieldClick({get}) {
  //Get current field boundary
  let currentField = field(get);
  //Convert to drawing boundary: {<rand-id>: [lat, lng], ...}
  let boundary = {};
  _.forEach(_.get(currentField, 'boundary.coordinates.0') || [], (coors) => { //TODO will not work with holes in fields etc
    boundary[uuid()] = [coors[1], coors[0]];
  });
  //Hide current field boundary from map
  get(sequences`Map.BoundaryDrawing.onStartDrawing`)({boundary})
}


export default [
  onEditFieldClick
]
