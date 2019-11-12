/*
  Get fields adding in display info
*/

import { moduleState, state } from 'cerebral'
import _ from 'lodash';
import seasonFields from '../../../computed/seasonFields';

export const fields = (get) => {
  const fieldStyles = get(state`Map.fieldStyles`)
  const selectedField = get(state`Map.selectedField`)
  const operation = get(state`TopBar.OperationDropdown.selectedOperation`)
  const fieldsToRender = seasonFields(get);
  return _.map(fieldsToRender, (field, id) => {
    if (_.startsWith(id, '_')) return false;
    var styledField = _.clone(field);
    //Add any styles
    if (fieldStyles[id] != null) styledField.style = fieldStyles[id];
    //Fill based on status of current operation
    if (operation) {
      var color = "white"
      if (operation.fields[id]) {
        if (operation.fields[id].status == 'planned') color = 'red'
        if (operation.fields[id].status == 'started') color = 'orange'
        if (operation.fields[id].status == 'done') color = 'green'
      }
      styledField.style = _.merge({}, styledField.style, {fillColor: color, color})
    }
    return styledField;
  })
}
