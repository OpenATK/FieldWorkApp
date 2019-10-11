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

  let field = null;
  if (get(state`OADAManager.connected`) == true) {
    let currentConnection = get(state`OADAManager.currentConnection`)
    field = get(state`oada.${currentConnection}.bookmarks.seasons.2019.fields.${selectedFieldId}`); //TODO year
  } else {
    field = get(state`localData.abc123.seasons.2019.fields.${selectedFieldId}`); //TODO year, organization
  }

  if (field == null) return null;
  return _.merge({}, field, {status});
}
