import _ from 'lodash';
import Promise from 'bluebird';

export default {
  styleField: {
    highlight({state}, fieldId) {
      if (fieldId) {
        const myState = _.get(state, 'view.Map');
        _.set(myState, `fieldStyles.${fieldId}`, {weight: 5})
      }
    },
    unhighlight({state}, fieldId) {
      if (fieldId) {
        const myState = _.get(state, 'view.Map');
        _.set(myState, `fieldStyles.${fieldId}`, {weight: 3})
      }
    }
  },
  async unselectField({state, actions}) {
    const myActions = _.get(actions, 'view.Map');
    const myState = _.get(state, 'view.Map');
    if (myState.selectedField) {
      actions.view.FieldDetails.close();
      myActions.styleField.unhighlight(myState.selectedField);
      await Promise.delay(200)
      myState.selectedField = null;
    }
  },
  onFieldClick({state, actions}, {id}) {
    const myActions = _.get(actions, 'view.Map');
    const myState = _.get(state, 'view.Map');
    const drawing = _.get(myState, `BoundaryDrawing.drawing`);
    if (!drawing) {
      myActions.styleField.unhighlight(myState.selectedField);
      myState.selectedField = id;
      myActions.styleField.highlight(id);
      actions.view.FieldDetails.open();
    }
  },
  onMapClick({actions}, props) {
    const myActions = _.get(actions, 'view.Map');
    myActions.unselectField()
    //Pass click to boundary drawing
    myActions.BoundaryDrawing.onMapClick(props)
  }
}
