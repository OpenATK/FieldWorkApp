import { set } from 'cerebral/factories'
import { moduleState, props, sequences } from "cerebral";

import open from './actions/open';

function oadaConnect({get}) {
  get(sequences`OADA.connect`)(props)
}

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
      set(moduleState`open`, false)
    ],
    onCancel: [
      set(moduleState`open`, false),
    ]
  }
};
