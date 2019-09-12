/*
  Updates old coordinate to new coordinate
*/
import { moduleState } from 'cerebral'
import _ from 'lodash'
import { debounce } from 'cerebral/factories'

function updateBoundaryPoint({store, props}) {
  //Find matching coord
  store.set(moduleState`boundary.${props.id}`, [props.latlng.lat, props.latlng.lng]);
}

export default [
  debounce(10),
  {
    continue: updateBoundaryPoint,
    discard: []
  }
]
