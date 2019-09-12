import { set } from 'cerebral/factories'
import { moduleState, props, sequences } from "cerebral";

import open from './actions/open';
import saveOperation from './actions/saveOperation';

export default {
  state: {
    open: false,
    name: ''
  },
  sequences: {
    onNameChange: [
      set(moduleState`name`, props`name`),
    ],
    onOpen: [
      open
    ],
    onSave: [
      saveOperation,
      set(moduleState`open`, false)
    ],
    onCancel: [
      set(moduleState`open`, false),
    ]
  }
};
