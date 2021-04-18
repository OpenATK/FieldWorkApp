import _ from 'lodash';
import uuid from 'uuid/v1'
import tree from "../../../app/OADAManager/tree";

function createOperation(context, {name}) {
  var operation = {
    name,
    fields: {}
  }
  return operation;
}

function addOperationToLocalData({state}, {operation}) {
  const id = uuid();
  _.set(state, `app.localData.abc123.seasons.2020.operations.${id}`, operation); //TODO year, organization
  return id;
}
async function addOperationToOADA({state, actions}, {operation}) {
  //Add to OADA
  const id = uuid();
  let requests = [
    {
      tree,
      data: operation,
      path: `/bookmarks/seasons/2020/operations/${id}` //TODO year
    }
  ];
  const connection_id = _.get(state, `app.OADAManager.currentConnection`)
  const ret = await actions.app.oada.put({requests, connection_id})
  const _id = _.get(ret, 'responses.0.headers.content-location').substr(1); //Remove leading `/` from /resources/<uuid>
  return {id, _id}
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
    const operation = createOperation(context, {name: myState.name, useTemplate: myState.useTemplate, invertTemplate: myState.invertTemplate, templateOperation: myState.templateOperation})

    if (myState.useTemplate) {
      // initialize the "planned" fields from a template operation
      let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
      const operations = _.omitBy(_.get(state, `app.oada.${currentConnection}.bookmarks.seasons.2020.operations`) || {}, (o, k) => {return _.startsWith(k, '_')}); //TODO year
      const template = operations[myState.templateOperation];
      if (!template) {
        alert('ERROR: The selected template operation was not found.  Did not create new operation.');
        return;
      }
      if (myState.invertTemplate) {
        console.log('INVERTING');
        // replace fields with all the fields from season that ARE NOT in template fields list
        operation.fields = _.mapValues(
          _.omitBy(state.app.seasonFields, (v,k) => !!template.fields[k]),
          v => ({ status: "planned" }) 
        );
        console.log('INVERTING, operation.fields = ', operation.fields);
      } else {
        // otherwise, use same fields as template
        operation.fields = _.cloneDeep(template.fields);
      }
      // Set all statuses to "planned"
      _.each(_.keys(operation.fields), k => {
        operation.fields[k].status = "planned";
      });
    }

    if (state.app.OADAManager.connected) {
      const {id, _id} = await addOperationToOADA(context, {operation});
      _.set(state, `view.TopBar.OperationDropdown.selected`, id)
    } else {
      const id = await addOperationToLocalData(context, {operation});
      _.set(state, `view.TopBar.OperationDropdown.selected`, id)
    }
    // Reset options
    state.view.Modals.NewOperation.useTemplate = false;
    state.view.Modals.NewOperation.invertTemplate = false;
    state.view.Modals.NewOperation.templateOperation = '';
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
  },
  onUseTemplate({state}) {
    const myState = state.view.Modals.NewOperation;
    myState.useTemplate = !myState.useTemplate;
  },
  onInvertTemplate({state}) {
    const myState = state.view.Modals.NewOperation;
    myState.invertTemplate = !myState.invertTemplate;
  },
  onTemplateOperation({state}, {templateOperation}) {
    const myState = state.view.Modals.NewOperation;
    myState.templateOperation = templateOperation;
  },

}
