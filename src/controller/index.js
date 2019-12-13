import { state } from "cerebral";
import { set } from "cerebral/factories";
import TopBar from "./modules/TopBar";
import Modals from "./modules/Modals";
import Map from "./modules/Map";
import FieldDetails from "./modules/FieldDetails";
import OADAManager from './modules/OADAManager'
import OADA from "@oada/cerebral-module";

import testFields from './test/testFields';
import acresStatus from './computed/acresStatus';

export default {
  state: {
    acresStatus,
    //Current field list
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
  },
  modules: {
    TopBar,
    Modals,
    Map,
    FieldDetails,
    OADAManager,
    oada: OADA
  },
  sequences: {
    toggleTitle: [ set(state`title`, "You toggled me!")],
    onMapClick: [set(state`title`, "Clicked")]
  }
};
