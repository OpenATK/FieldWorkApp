import onStatusChange from './sequences/onStatusChange'
import onEditFieldClick from './sequences/onEditFieldClick'

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
    onEditFieldClick,
    onOpen: [
      open
    ],
    onClose: [
      close
    ]
  }
};
