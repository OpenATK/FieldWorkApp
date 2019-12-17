import { set } from 'cerebral/factories'
import { moduleState, state, props } from "cerebral";

import getSeasonField from '../../../../helpers/getSeasonField';

function isEditing({get, path}) {
  let editingField = get(state`Map.editingField`);
  if (editingField == null) return path.false();
  return path.true({editingField});
}

function getField({get, props, store}) {
  //Get current season field from editingField id
  let field = getSeasonField(get, props.editingField);
  return {field};
}

export default [
  isEditing,
  {
    true: [
      getField,
      set(moduleState`name`, props`field.name`) //Populate the name in the modal popup
    ],
    false: [
      set(moduleState`name`, '')
    ]
  },
  set(moduleState`open`, true)
]
