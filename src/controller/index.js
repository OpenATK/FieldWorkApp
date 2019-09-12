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
    seasonFields: {
      /*'2019': {
        <field-uuid>: {
          season: 2018,
          boundary: <geo-json>,
          operations: {
            <operation-uuid>
          }
        }
      }*/
      '2019': {
        ...testFields,
      }
    },
    operations: {
      '2019': {
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
