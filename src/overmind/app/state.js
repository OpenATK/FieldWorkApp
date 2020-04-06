import testFields from './test/testFields';
import _ from 'lodash';

export default {
  acresStatus: ({}, state) => {
    var [planned, started, done, total] = [0, 0, 0, 100];
    return {
      planned: Math.round(planned),
      plannedPercentage: Math.round((planned / (total || 1)) * 100),
      started: Math.round(started),
      startedPercentage: Math.round((started / (total || 1)) * 100),
      done: Math.round(done),
      donePercentage: Math.round((done / (total || 1)) * 100),
    }
  },
  seasonFields: ({}, state) => {
    let fields = [];
    if (_.get(state, `app.OADAManager.connected`) == true) {
      let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
      fields = _.get(state, `app.oada.${currentConnection}.bookmarks.seasons.2019.fields`) //TODO year
    } else {
      fields = _.get(state, `app.localData.abc123.seasons.2019.fields`) //TODO year, organization
    }
    return fields;
  },
  operationFields: ({}, state) => {
    let operation = _.get(state, 'view.TopBar.OperationDropdown.selectedOperation');
    let operationFields = [];
    if (operation != null && operation.id != null) {
      if (_.get(state, `app.OADAManager.connected`) == true) {
        let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
        operationFields = _.get(state, `app.oada.${currentConnection}.bookmarks.seasons.2019.operations.${operation.id}.fields`) || []; //TODO year
      } else {
        operationFields = _.get(state, `app.localData.abc123.seasons.2019.operations.${operation.id}.fields`) || []; //TODO year, organization
      }
    }
    return operationFields;
  },
  localData: {
    organizations: {
      'abc123': {
        name: 'Default'
      }
    },
    'abc123': {
      fields: {
        /*'a': {
          id: 'a',
          name: 'Back 40',
          boundary: '' //GEOJSON
        }*/
        ...testFields,
      },
      seasons: {
        /*'2019': {
          fields: {
            '<field-uuid>': {
              season: 2018,
              boundary: <geo-json>,
              operations: {
                '<operation-uuid>': {}
              }
            }
          },
          operations: {
            '<operation-uuid>': {
              id: '<operation-uuid>',
              year: 2019,
              name: 'Corn Planting',
              fields: {
                '<field-uuid>': {
                  status: 'Planned',
                }
              }
            }
          }
        }*/
        '2019': {
          fields: {
            ...testFields,
          },
          operations: {
            /*'<operation-uuid>': {
              id: '<operation-uuid>',
              year: 2019,
              name: 'Corn Planting',
              fields: {
                '<field-uuid>': {
                  status: 'Planned',
                }
              }
            }*/
          }
        }
      }
    }
  }
}
