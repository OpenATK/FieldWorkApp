import { state } from "cerebral";
import { set } from "cerebral/factories";

import onAdd from './sequences/onAdd';
import onChange from './sequences/onChange';
import onOpenChange from './sequences/onOpenChange';
import onSearch from './sequences/onSearch';

import {operationList, selectedOperation} from './computed/operations';

export default {
  state: {
    open: false,
    selected: null,
    search: '',

    list: operationList,
    selectedOperation
  },
  sequences: {
    onAdd,
    onChange,
    onOpenChange,
    onSearch
  }
};
