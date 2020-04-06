import _ from 'lodash';
import geojsonArea from '@mapbox/geojson-area';

export default {
  open: false,
  field: ({}, state) => {
    const selectedFieldId = _.get(state, `view.Map.selectedField`);
    const operation = _.get(state, `view.TopBar.OperationDropdown.selectedOperation`);
    if (operation == null || operation.id == null || operation.fields == null || selectedFieldId == null) return null;

    const status = _.get(operation.fields[selectedFieldId], 'status');
    let field = null;
    if (_.get(state, `app.OADAManager.connected`) == true) {
      let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
      field = _.get(state, `app.oada.${currentConnection}.bookmarks.seasons.2019.fields.${selectedFieldId}`); //TODO year
    } else {
      field = _.get(state, `app.localData.abc123.seasons.2019.fields.${selectedFieldId}`); //TODO year, organization
    }
    if (field == null) return null;
    const acres = geojsonArea.geometry(field.boundary) * 0.000247105 //Meters to acres;
    return _.merge({}, field, {status, acres});
  }
}
