/*
  Get selected field and it's info
*/

import { state } from 'cerebral'
import _ from 'lodash';

export default function field (get) {
  const selectedFieldId = get(state`Map.selectedField`);
  const operation = get(state`TopBar.OperationDropdown.selectedOperation`) //Can't use moduleState here or won't rerun when change occurs
  if (operation == null) return null;
  const status = _.get(operation.fields[selectedFieldId], 'status');
  const field = get(state`seasonFields.2019.${selectedFieldId}`);
  if (field == null) return null;
  return _.merge({}, field, {status});
}
