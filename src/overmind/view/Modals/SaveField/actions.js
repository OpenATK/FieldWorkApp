import _ from 'lodash';
import uuid from 'uuid/v1'
import tree from "../../../app/OADAManager/tree";


function convertToGEOJSON(points) {
  var boundary = {
    type: "Polygon",
    "coordinates": [_.map(points, (p) => {return [p[1], p[0]]})] //Flip lat/lng and add array around
  }
  return boundary;
}
function getChanges({state, actions}, fieldId, newBoundary) {
  const myState = state.view.Modals.SaveField;
  //See if name or boundary has changed
  let field = actions.app.getSeasonField(fieldId);
  let newName = myState.name;
  var changes = {};
  if (newName != field.name) changes.name = newName;
  if (_.isEqual(newBoundary,field.boundary) == false) changes.boundary = newBoundary;
  return changes;
}
function saveChangesToLocalData({state}, editingFieldId, changes) {
  if (_.isEmpty(changes)) return;
  const fieldPath = `app.localData.abc123.fields.${editingFieldId}`; //TODO organization
  _.set(state, fieldPath, _.merge({}, _.get(state, fieldPath), changes));
  const seasonFieldPath = `app.localData.abc123.seasons.2019.fields.${editingFieldId}` //TODO year, organization
  _.set(state, seasonFieldPath, _.merge({}, _.get(state, seasonFieldPath), changes));
}
function saveChangesToOADA(context, editingFieldId, changes) {
  const { state } = context;
  if (_.isEmpty(changes)) return;
  //Add to OADA
  let requests = [
    {
      tree,
      data: changes,
      path: `/bookmarks/fields/fields/${editingFieldId}`
    },
    {
      tree,
      data: changes,
      path: `/bookmarks/seasons/2019/fields/${editingFieldId}` //TODO year
    }
  ];
  let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
  //TODO send request to OADA
  throw 'TODO send request to oada'
}
function createFarm(context) {
  const { state } = context;
  const myState = state.view.Modals.SaveField;
  var farm = {
    id: uuid(),
    name: myState.name + '_Farm'
  }
  return farm
}
function createField(context, {boundary, farm}) {
  const { state } = context;
  const myState = state.view.Modals.SaveField;
  var field = {
    id: uuid(),
    name: myState.name,
    boundary: boundary,
    farm: {
      id: farm.id, //TODO only do this if local data?
      key: farm.id,
      //_id: _.get(props, 'responses.0.headers.location').substr(1)  //TODO fix this!!!!
    }
  }
  return field
}
function addFieldToLocalData(context, {farm , field}) {
  const { state } = context;
  _.set(state, `app.localData.abc123.farms.${farm.id}`, farm); //TODO organization
  _.set(state, `app.localData.abc123.fields.${field.id}`, field); //TODO organization
  _.set(state, `app.localData.abc123.seasons.2019.fields.${field.id}`, {...field, operations: {}, year: '2019'}); //TODO year, organization
}
function addFarmToOADA(context, {farm}) {
  const { state } = context;
  //Add to OADA
  let requests = [
    {
      tree,
      data: farm,
      path: `/bookmarks/fields/farms/${farm.id}`
    }
  ];
  let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
  //return {requests, connection_id: currentConnection};
  //TODO requests
  throw 'TODO: Do oada requests'
}
function addFieldToOADA(context, {field}) {
  const { state } = context;
  //Add to OADA
  let requests = [
    {
      tree,
      data: field,
      path: `/bookmarks/fields/fields/${field.id}`
    },
    {
      tree,
      data: {...field, operations: {}, year: '2019'}, //TODO year
      path: `/bookmarks/seasons/2019/fields/${field.id}` //TODO year
    }
  ];
  let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
  //return {requests, connection_id: currentConnection};
  //TODO requests
  throw 'TODO: Do oada requests'
}

export default {
  open({state, actions}) {
    const myState = state.view.Modals.SaveField;
    const editingField = _.get(state, `view.Map.editingField`);
    if (editingField == null) {
      myState.name = "";
    } else {
      let field = actions.app.getSeasonField(editingField);
      //Populate the name in the modal popup
      myState.name = field.name;
    }
    myState.open = true;
  },
  close({state}) {
    const myState = state.view.Modals.SaveField;
    myState.open = false;
  },
  async saveField(context) {
    const {state} = context;
    //Convert the field to geojson
    const points = _.get(state, `view.Map.BoundaryDrawing.boundary`)
    const boundary = convertToGEOJSON(points);
    let editingFieldId = _.get(state, `view.Map.editingField`);
    if (editingFieldId) {
      //We are editing a field find the changes, if any
      const changes = getChanges(context, editingFieldId, boundary)
      if (state.app.OADAManager.connected) {
        saveChangesToOADA(context, editingFieldId, changes)
      } else {
        saveChangesToLocalData(context, editingFieldId, changes)
      }
    } else {
      //Create a new farm first
      const farm = await createFarm(context)
      const field = await createField(context, {boundary, farm})
      if (state.app.OADAManager.connected) {
        await addFarmToOADA(context, {farm})
        await addFieldToOADA(context, {field})
      } else {
        await addFieldToLocalData(context, {farm, field})
      }
    }
  },
  onSave({actions, state}) {
    const myActions = actions.view.Modals.SaveField;
    myActions.saveField();
    actions.view.Map.BoundaryDrawing.onStopDrawing();
    state.view.Map.editingField = null;
    myActions.close();
  },
  onCancel({actions, state}) {
    const myActions = actions.view.Modals.SaveField;
    actions.view.Map.BoundaryDrawing.onStopDrawing();
    state.view.Map.editingField = null;
    myActions.close();
  },
  onNameChange({state}, {name}) {
    const myState = state.view.Modals.SaveField;
    myState.name = name;
  }
}
