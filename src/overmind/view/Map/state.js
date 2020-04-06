import _ from 'lodash';

export default {
  fieldStyles: {},
  selectedField: null,
  editingField: null,
  fields: ({}, state) => {
    const fieldStyles = _.get(state, `view.Map.fieldStyles`)
    const editingField = _.get(state, `view.Map.editingField`)
    const drawingBoundary = _.get(state, `view.Map.BoundaryDrawing.drawing`)
    const operation = _.get(state, `view.TopBar.OperationDropdown.selectedOperation`)
    const fieldsToRender = _.get(state, `app.seasonFields`);
    return _.map(fieldsToRender, (field, id) => {
      if (_.startsWith(id, '_')) return false;
      if (editingField == id) return false;
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
}
