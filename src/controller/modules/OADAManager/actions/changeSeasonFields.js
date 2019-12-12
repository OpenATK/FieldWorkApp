/*
  Change a season fields name or boundary
*/
import { state, props } from 'cerebral'
import _ from 'lodash';
import { when, set } from 'cerebral/factories'
import oada from "@oada/cerebral-module/sequences";
import tree from "../tree.js"

function changeSeasonFields({props, path}) {
  let requests = [];
  _.forEach(props.fieldsChanged, (fieldChange) => {
    let data = {};
    if (fieldChange.name) data.name = fieldChange.name;
    if (fieldChange.boundary) data.boundary = fieldChange.boundary;
    if (_.isEmpty(data)) return;
    requests.push(
      { //Change season's field's name, boundary
        tree,
        data,
        type: 'application/vnd.oada.field.1+json',
        path: `/bookmarks/seasons/2019/fields/${fieldChange.fieldId}` //TODO year
      }
    )
  })
  if (requests.length == 0) return path.doNothing();
  return path.put({requests, connection_id: 'localhost'}); //TODO connection id
}

export default [
  when(state`OADAManager.connected`),
  {
    true: [
      changeSeasonFields,
      {
        put: [oada.put],
        doNothing: []
      }
    ],
    false: []
  }
]
