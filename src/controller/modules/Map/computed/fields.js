/*
  Get fields adding in display info
*/

import { moduleState, state } from 'cerebral'
import _ from 'lodash';

export const fields = (get) => {
  const fieldStyles = get(state`Map.fieldStyles`)
  const selectedField = get(state`Map.selectedField`)
  const operation = get(state`TopBar.OperationDropdown.selectedOperation`)
  var fieldsToRender = get(state`season.2019.fields`) //TODO year
  return _.map(fieldsToRender, (field, id) => {
    var styledField = _.clone(field);
    //Add any styles
    if (fieldStyles[id] != null) styledField.style = fieldStyles[id];
    if (operation) {
      var color = "white"
      if (operation.fields[id]) {
        if (operation.fields[id].status == 'planned') color = 'red'
        if (operation.fields[id].status == 'started') color = 'orange'
        if (operation.fields[id].status == 'done') color = 'green'
      }
      styledField.style = _.merge({}, styledField.style, {fillColor: color, color})
    }
    //TODO fill based on status of current operation
    return styledField;
  })
}
