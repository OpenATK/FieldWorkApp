import onFieldClick from './sequences/onFieldClick'
import onMapClick from './sequences/onMapClick'
import unselectField from './sequences/unselectField'
import BoundaryDrawing from './modules/BoundaryDrawing'

import {fields} from './computed/fields'
export default {
  state: {
    fieldStyles: {},
    selectedField: null,
    fields
  },
  sequences: {
    onFieldClick,
    onMapClick,
    //Actions that can be called async from other modules
    unselectField
  },
  modules: {
    BoundaryDrawing
  }
};
