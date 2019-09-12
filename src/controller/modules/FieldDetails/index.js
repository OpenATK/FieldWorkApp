import onStatusChange from './sequences/onStatusChange'

import field from './computed/field'
import open from './actions/open';
import close from './actions/close';

export default {
  state: {
    open: false,
    field
  },
  sequences: {
    onStatusChange,
    onOpen: [
      open
    ],
    onClose: [
      close
    ]
  }
};
