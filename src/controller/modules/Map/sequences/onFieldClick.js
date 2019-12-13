import styleField from '../actions/styleField'

import { props, moduleState, state, sequences } from 'cerebral'
import { set } from 'cerebral/factories'

function openFieldDetails({get}) {
  get(sequences`FieldDetails.onOpen`)()
}
function isDrawing({path, get}) {
  //Is drawing a field
  const drawing = get(state`Map.BoundaryDrawing.drawing`);
  if (drawing) return path.true();
  return path.false();
}

export default [
  isDrawing,
  {
    true: [],
    false: [
      styleField.unhighlight(moduleState`selectedField`),
      set(moduleState`selectedField`, props`id`),
      styleField.highlight(props`id`),
      openFieldDetails
    ]
  }
]
