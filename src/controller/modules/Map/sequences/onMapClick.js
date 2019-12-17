import styleField from '../actions/styleField'

import { moduleState, state, sequences } from 'cerebral'
import { set, sequence } from 'cerebral/factories'

function fieldIsSelected({path, get}) {
  const selectedField = get(moduleState`selectedField`);
  if (selectedField == null) return path.false();
  return path.true();
}
function isDrawing({path, get}) {
  //Is drawing a field
  const drawing = get(state`Map.BoundaryDrawing.drawing`);
  if (drawing) return path.true();
  return path.false();
}
function closeFieldDetails({get}) {
  get(sequences`FieldDetails.onClose`)()
}

function callForModules({get, props}) {
  get(sequences`Map.BoundaryDrawing.onMapClick`)(props)
}

export default sequence('Map.onMapClick', [
  fieldIsSelected,
  {
    true: [
        closeFieldDetails,
        styleField.unhighlight(moduleState`selectedField`),
        set(moduleState`selectedField`, null)
    ],
    false: [

    ]
  },
  callForModules
])
