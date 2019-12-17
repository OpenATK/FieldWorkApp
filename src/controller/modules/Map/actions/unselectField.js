/*
  Increase stroke size on field
*/

import styleField from '../actions/styleField'

import { moduleState, state, sequences } from 'cerebral'
import { set, sequence } from 'cerebral/factories'

function fieldIsSelected({path, get}) {
  const selectedField = get(moduleState`selectedField`);
  if (selectedField == null) return path.false();
  return path.true();
}
function closeFieldDetails({get}) {
  get(sequences`FieldDetails.onClose`)()
}

export default [
  fieldIsSelected,
  {
    true: [
        closeFieldDetails,
        styleField.unhighlight(moduleState`selectedField`),
        set(moduleState`selectedField`, null)
    ],
    false: [

    ]
  }
]
