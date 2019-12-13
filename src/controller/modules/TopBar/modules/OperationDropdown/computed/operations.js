/*
  Get operations, filtering by search
*/

import { moduleState, state } from 'cerebral'
import _ from 'lodash';

export const operationList = (get) => {
  let operations = null;
  if (get(state`OADAManager.connected`) == true) {
    let currentConnection = get(state`OADAManager.currentConnection`)
    operations = get(state`oada.${currentConnection}.bookmarks.seasons.2019.operations`); //TODO year
  } else {
    operations = get(state`localData.abc123.seasons.2019.operations`) //TODO year, organization
  }
  const selectedOperation = get(state`TopBar.OperationDropdown.selected`) //Can't use moduleState here or won't rerun when change occurs
  const search = get(state`TopBar.OperationDropdown.search`) //Can't use moduleState here or won't rerun when change occurs
  return _.compact(_.map(operations, ({name, id}) => {
    if (id == null) return null; //Not an operation, a _key for oada
    if (search != '' && name.search(search) == -1) return null;
    return {
      text: name,
      value: id,
      selected: (selectedOperation == id),
      label: { color: 'green', empty: true, circular: true }
    }
  }))
}

export const selectedOperation = (get) => {
  let operations = null;
  if (get(state`OADAManager.connected`) == true) {
    let currentConnection = get(state`OADAManager.currentConnection`)
    operations = _.omitBy(get(state`oada.${currentConnection}.bookmarks.seasons.2019.operations`) || {}, (o, k) => {return _.startsWith(k, '_')}); //TODO year
  } else {
    operations = get(state`localData.abc123.seasons.2019.operations`) //TODO year, organization
  }
  const selectedOperation = get(state`TopBar.OperationDropdown.selected`) //Can't use moduleState here or won't rerun when change occurs
  if (selectedOperation == null && _.keys(operations).length > 0) return operations[_.keys(operations)[0]];
  return operations[selectedOperation];
}
