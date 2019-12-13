import { state, props } from 'cerebral'
import _ from 'lodash';
import { when, set } from 'cerebral/factories'
import oada from "@oada/cerebral-module/sequences";
import tree from "../../OADAManager/tree.js"

function changeLocalFieldStatus({get, props, store}) {
  const selectedFieldId = get(state`Map.selectedField`);
  const operation = get(state`TopBar.OperationDropdown.selectedOperation`) //Can't use moduleState here or won't rerun when change occurs
  var field = _.clone(get(state`localData.abc123.seasons.2019.operations.${operation.id}.fields.${selectedFieldId}`)) || {}; //TODO year, organization
  var newStatus = props.status;
  if (field.status == props.status) newStatus = null; //Unchecking
  field.status = newStatus;
  if (field.status == null) {
    //Remove field from operation
    store.unset(state`localData.abc123.seasons.2019.operations.${operation.id}.fields.${selectedFieldId}`) //TODO year, organization
    //Remove operation from season's field's operation list
    store.unset(state`localData.abc123.seasons.2019.fields.${selectedFieldId}.operations.${operation.id}`) //TODO year, organization
  } else {
    //Add field to operation
    store.set(state`localData.abc123.seasons.2019.operations.${operation.id}.fields.${selectedFieldId}`, field) //TODO year, organization
    //Create operations key on season's field list if doesn't exist
    if (get(state`localData.abc123.seasons.2019.fields.${selectedFieldId}.operations`) == null) store.set(state`localData.abc123.seasons.2019.fields.${selectedFieldId}.operations`, {}) //TODO year, organization
    //Add operation to field in season's field's operation list
    store.set(state`localData.abc123.seasons.2019.fields.${selectedFieldId}.operations.${operation.id}`, {}) //TODO year, organization
  }
}

function changeOADAFieldStatus({get, props, path}) {
  const selectedFieldId = get(state`Map.selectedField`);
  const operation = get(state`TopBar.OperationDropdown.selectedOperation`) //Can't use moduleState here or won't rerun when change occurs

  let currentConnection = get(state`OADAManager.currentConnection`)
  var field = _.clone(get(state`oada.${currentConnection}.bookmarks.seasons.2019.operations.${operation.id}.fields.${selectedFieldId}`)) || {}; //TODO year, organization
  var newStatus = props.status;
  if (field.status == props.status) newStatus = null; //Unchecking
  field.status = newStatus;

  if (field.status == null) {
    let requests = [
      {  //Remove field to operation
        type: 'application/vnd.oada.operation.1+json', //TODO oada.put should handle this
        path: `/bookmarks/seasons/2019/operations/${operation.id}/fields/${selectedFieldId}` //TODO year
      },
      { //Remove operation to field in season's field's operation list
        type: 'application/vnd.oada.field.1+json',
        path: `/bookmarks/seasons/2019/fields/${selectedFieldId}/operations/${operation.id}` //TODO year
      }
    ];
    return path.delete({requests, connection_id: currentConnection});
  } else {
    let requests = [
      {  //Add field to operation
        tree,
        data: field,
        type: 'application/vnd.oada.operation.1+json', //TODO oada.put should handle this
        path: `/bookmarks/seasons/2019/operations/${operation.id}/fields/${selectedFieldId}` //TODO year
      },
      { //Add operation to field in season's field's operation list
        tree,
        data: {_id: operation._id}, //TODO include link to operation
        type: 'application/vnd.oada.field.1+json',
        path: `/bookmarks/seasons/2019/fields/${selectedFieldId}/operations/${operation.id}` //TODO year
      }
    ];
    return path.put({requests, connection_id: currentConnection});
  }
}

export default [
  when(state`OADAManager.connected`),
  {
    true: [
      changeOADAFieldStatus,
      {
        put: [oada.put],
        delete: [oada.delete]
      }
    ],
    false: [
      changeLocalFieldStatus
    ]
  }
]
