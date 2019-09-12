/*
  Adds a point to the current boundary being drawn
*/
import { moduleState } from 'cerebral'
import uuid from 'uuid/v1'

function addPointToBoundary({store, props}) {
  store.set(moduleState`boundary.${uuid()}`, [props.lat, props.lng]);
}

export default [
  addPointToBoundary
]
