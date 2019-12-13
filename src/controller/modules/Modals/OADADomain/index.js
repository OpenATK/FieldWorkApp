import { set } from 'cerebral/factories'
import { moduleState, props, sequences } from "cerebral";

import open from './actions/open';
import onConnectClick from './sequences/onConnectClick';


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
    onConnect: onConnectClick,
    onCancel: [
      set(moduleState`open`, false),
    ]
  }
};
