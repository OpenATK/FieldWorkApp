/*
  If drawing a field:
    - add point to boundary.
*/

import { moduleState } from 'cerebral'
import { equals, sequence } from 'cerebral/factories'
import addPointToBoundary from '../actions/addPointToBoundary'

function isDrawingBoundary({get, path}) {
  if (get(moduleState`drawing`) == true) return path.true();
  return path.false();
}

export default sequence('boundaryDrawing.onMapClick', [
  isDrawingBoundary,
  {
    true: [
      addPointToBoundary
    ],
    false: []
  }
])
