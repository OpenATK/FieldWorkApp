import { set } from 'cerebral/factories'
import { moduleState, props, sequences } from "cerebral";

import open from './actions/open';
import connect from './actions/connect';

export default {
  state: {
    open: false,
    domain: ''
  },
  sequences: {
    onDomainChange: [
      set(moduleState`domain`, props`domain`),
    ],
    onOpen: [
      open
    ],
    onConnect: [
      connect,
      set(moduleState`open`, false)
    ],
    onCancel: [
      set(moduleState`open`, false),
    ]
  }
};
