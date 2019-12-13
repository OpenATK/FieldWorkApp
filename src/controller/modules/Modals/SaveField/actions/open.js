import { set } from 'cerebral/factories'
import { moduleState, state } from "cerebral";

import getSeasonField from '../../../../helpers/getSeasonField';

function isEditing({get, path}) {
  let editingField = get(state`Map.editingField`);
  if (editingField == null) return path.false();
  return path.true({editingField});
}

function getField({get, props, store}) {
  //Get current season field from editingField id
  let field = getSeasonField(get, props.editingField);
  console.log('field', field);
  store.set(moduleState`name`, 'Test');
}

export default [
  isEditing,
  {
    true: [ //Set name to current name
      getField
    ],
    false: [
      set(moduleState`name`, '')
    ]
  },
  set(moduleState`open`, true)
]
