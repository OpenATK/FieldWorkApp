import _ from 'lodash';
import uuid from 'uuid/v1';

export default {
  open({state}) {
    const myState = state.view.FieldDetails;
    myState.open = true;
  },
  close({state}) {
    const myState = state.view.FieldDetails;
    myState.open = false;
  },
  changeOADAFieldStatus() {
    //// TODO: implement
    throw 'TODO: implement oada'
  },
  changeLocalFieldStatus({state}, status) {
    const myState = state.view.FieldDetails;
    const selectedFieldId = _.get(state, `view.Map.selectedField`);
    const operation = _.get(state, `view.TopBar.OperationDropdown.selectedOperation`)
    var field = _.clone(_.get(state, `app.localData.abc123.seasons.2019.operations.${operation.id}.fields.${selectedFieldId}`)) || {}; //TODO year, organization
    var newStatus = status;
    if (field.status == status) newStatus = null; //Unchecking
    field.status = newStatus;
    if (field.status == null) {
      //Remove field from operation
      _.unset(state, `app.localData.abc123.seasons.2019.operations.${operation.id}.fields.${selectedFieldId}`) //TODO year, organization
      //Remove operation from season's field's operation list
      _.unset(state, `app.localData.abc123.seasons.2019.fields.${selectedFieldId}.operations.${operation.id}`) //TODO year, organization
    } else {
      //Add field to operation
      _.set(state, `app.localData.abc123.seasons.2019.operations.${operation.id}.fields.${selectedFieldId}`, field) //TODO year, organization
      //Create operations key on season's field list if doesn't exist
      if (_.get(state, `app.localData.abc123.seasons.2019.fields.${selectedFieldId}.operations`) == null) _.set(state, `app.localData.abc123.seasons.2019.fields.${selectedFieldId}.operations`, {}) //TODO year, organization
      //Add operation to field in season's field's operation list
      _.set(state, `app.localData.abc123.seasons.2019.fields.${selectedFieldId}.operations.${operation.id}`, {}) //TODO year, organization
    }
  },
  onStatusChange({state, actions}, {status}) {
    const myActions = actions.view.FieldDetails;
    if (state.app.OADAManager.connected) {
      myActions.changeOADAFieldStatus(status)
    } else {
      myActions.changeLocalFieldStatus(status)
    }
  }
}
