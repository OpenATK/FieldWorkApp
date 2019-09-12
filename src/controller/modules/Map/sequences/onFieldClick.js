import styleField from '../actions/styleField'

import { props, moduleState, sequences } from 'cerebral'
import { set } from 'cerebral/factories'

function openFieldDetails({get}) {
  get(sequences`FieldDetails.onOpen`)()
}

export default [
  styleField.unhighlight(moduleState`selectedField`),
  set(moduleState`selectedField`, props`id`),
  styleField.highlight(props`id`),
  openFieldDetails
]
