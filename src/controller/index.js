import { state } from "cerebral";
import { set } from "cerebral/factories";
import TopBar from "./modules/TopBar";
import Modals from "./modules/Modals";
import Map from "./modules/Map";
import FieldDetails from "./modules/FieldDetails";

import OADA from "@oada/cerebral-module";
import testFields from './test/testFields';

export default {
  state: {
    //Current field list
    fields: {
      /*'a': {
        id: 'a',
        name: 'Back 40',
        boundary: '' //GEOJSON
      }*/
      ...testFields,
    },
    season: {
      /*'2019': {
        fields: {
          <field-uuid>: {
            season: 2018,
            boundary: <geo-json>,
            operations: {
              <operation-uuid>
            }
          }
        }
        operations: {

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
  },
  modules: {
    TopBar,
    Modals,
    Map,
    FieldDetails,
    OADA
  },
  sequences: {
    toggleTitle: [set(state`title`, "You toggled me!")],
    onMapClick: [set(state`title`, "Clicked")]
  }
};
