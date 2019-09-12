/*
  Get operations, filtering by search
*/

import { moduleState, state } from 'cerebral'
import _ from 'lodash';

export const operationList = (get) => {
  const operations = get(state`operations.2019`)
  const selectedOperation = get(state`TopBar.OperationDropdown.selected`) //Can't use moduleState here or won't rerun when change occurs
  const search = get(state`TopBar.OperationDropdown.search`) //Can't use moduleState here or won't rerun when change occurs
  return _.compact(_.map(operations, ({name, id}) => {
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
  const operations = get(state`operations.2019`)
  const selectedOperation = get(state`TopBar.OperationDropdown.selected`) //Can't use moduleState here or won't rerun when change occurs
  if (selectedOperation == null && _.keys(operations).length > 0) return operations[_.keys(operations)[0]];
  return operations[selectedOperation];
}
