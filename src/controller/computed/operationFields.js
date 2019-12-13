/*
  Get operationFields
*/
import { state } from 'cerebral'
import {selectedOperation} from '../modules/TopBar/modules/OperationDropdown/computed/operations.js';

export default function operationFields (get) {
  let operation = selectedOperation(get);  //Grabbing the computed from the state does not work here. Not sure why. See: https://github.com/cerebral/cerebral/issues/1397
  let operationFields = [];
  if (operation != null) {
    if (get(state`OADAManager.connected`) == true) {
      let currentConnection = get(state`OADAManager.currentConnection`)
      operationFields = get(state`oada.${currentConnection}.bookmarks.seasons.2019.operations.${operation.id}.fields`) || []; //TODO year
    } else {
      operationFields = get(state`localData.abc123.seasons.2019.operations.${operation.id}.fields`) || []; //TODO year, organization
    }
  }
  return operationFields;
}
