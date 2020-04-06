import _ from 'lodash';
import uuid from 'uuid/v1'
import tree from "../../../app/OADAManager/tree";

function createOperation(context, {name}) {
  var operation = {
    id: uuid(),
    year: '2019', //TODO year
    name,
    fields: {}
  }
  return operation;
}

function addOperationToLocalData({state}, {operation}) {
  _.set(state, `app.localData.abc123.seasons.2019.operations.${operation.id}`, operation); //TODO year, organization
}
async function addOperationToOADA({state}, {operation}) {
  //Add to OADA
  let requests = [
    {
      tree,
      data: operation,
      path: `/bookmarks/seasons/2019/operations/${operation.id}` //TODO year
    }
  ];
  let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
  //return {requests, connection_id: currentConnection};
  //TODO execute OADA request
  throw 'TODO oada request'
}

export default {
  open({state}) {
    const myState = state.view.Modals.NewOperation;
    myState.name = '';
    myState.open = true;
  },
  close({state}) {
    const myState = state.view.Modals.NewOperation;
    myState.open = false;
  },
  async saveOperation(context) {
    const {state} = context;
    const myState = state.view.Modals.NewOperation;
    const operation = createOperation(context, {name: myState.name})
    if (state.app.OADAManager.connected) {
      addOperationToOADA(context, {operation});
    } else {
      await addOperationToLocalData(context, {operation});
    }
    _.set(state, `view.TopBar.OperationDropdown.selected`, operation.id)
  },
  onNameChange({state}, {name}) {
    const myState = state.view.Modals.NewOperation;
    myState.name = name;
  },
  onCancel({actions}) {
    const myActions = actions.view.Modals.NewOperation;
    myActions.close();
  },
  async onSave({actions}) {
    const myActions = actions.view.Modals.NewOperation;
    await myActions.saveOperation();
    myActions.close();
  }
}
