import _ from 'lodash';

export default {
  fieldStyles: {},
  selectedField: null,
  editingField: null,
  bounds: [
    [
      41.44053877385792,
      -84.97886180877687
    ],
    [
      41.46330393671208,
      -84.96770381927492
    ]
  ],
  fields: ({}, state) => {
    const fieldStyles = _.get(state, `view.Map.fieldStyles`)
    const editingField = _.get(state, `view.Map.editingField`)
    const drawingBoundary = _.get(state, `view.Map.BoundaryDrawing.drawing`)
    const operation = _.get(state, `view.TopBar.OperationDropdown.selectedOperation`)
    const fieldsToRender = _.get(state, `app.seasonFields`);
    return _.chain(fieldsToRender).mapValues((field, id) => {
      if (editingField == id) return null; //Don't show this field.
      var styledField = _.clone(field);
      //Add any styles
      if (fieldStyles[id] != null) styledField.style = fieldStyles[id];
      //Fill based on status of current operation
      if (operation) {
        var color = "white"
        if (operation.fields && operation.fields[id]) {
          if (operation.fields[id].status == 'planned') color = 'red'
          if (operation.fields[id].status == 'started') color = 'orange'
          if (operation.fields[id].status == 'done') color = 'green'
        }
        styledField.style = _.merge({}, styledField.style, {fillColor: color, color})
      }
      return styledField;
    }).omitBy((v, k) => {
      if (v == null) return true;
    }).value();
  }
}
