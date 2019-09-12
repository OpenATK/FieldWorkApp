import { state } from "cerebral";
import { set } from "cerebral/factories";

import onAddField from './sequences/onAddField';
import onSaveField from './sequences/onSaveField';
import onCancelField from './sequences/onCancelField';
import onConnect from './sequences/onConnect';
import OperationDropdown from './modules/OperationDropdown';

export default {
  state: {

  },
  sequences: {
    onAddField,
    onSaveField,
    onCancelField,
    onConnect
  },
  modules: {
    OperationDropdown
  }
};
