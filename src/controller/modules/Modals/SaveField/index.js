import { set } from 'cerebral/factories'
import { moduleState, props, sequences, state } from "cerebral";

import saveField from './actions/saveField';
import open from './actions/open';

function stopDrawing({get}) {
  get(sequences`Map.BoundaryDrawing.onStopDrawing`)(props)
}

export default {
  state: {
    open: false,
    name: ''
  },
  sequences: {
    onOpen: [
      open
    ],
    onNameChange: [
      set(moduleState`name`, props`name`),
    ],
    onSave: [
      saveField,
      stopDrawing,
      set(state`Map.editingField`, null),
      set(moduleState`open`, false)
    ],
    onCancel: [
      stopDrawing,
      set(state`Map.editingField`, null),
      set(moduleState`open`, false)
    ]
  }
};
