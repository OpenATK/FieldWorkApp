import { state } from 'cerebral'
import _ from 'lodash';

export default function changeFieldStatus({get, props, store}) {
  const selectedFieldId = get(state`Map.selectedField`);
  const operation = get(state`TopBar.OperationDropdown.selectedOperation`) //Can't use moduleState here or won't rerun when change occurs
  var field = get(state`season.2019.operations.${operation.id}.fields.${selectedFieldId}`) || {}; //TODO year
  var newStatus = props.status;
  if (field.status == props.status) newStatus = null; //Unchecking
  field.status = newStatus;
  //Add field to operation
  store.set(state`season.2019.operations.${operation.id}.fields.${selectedFieldId}`, field) //TODO year
  //Create operations key on seasonField if doesn't exist
  if (get(state`season.2019.fields.${selectedFieldId}.operations`) == null) store.set(state`season.2019.fields.${selectedFieldId}.operations`, {}) //TODO year
  //Add operation to field
  store.set(state`season.2019.fields.${selectedFieldId}.operations.${operation.id}`, {}) //TODO year
}
