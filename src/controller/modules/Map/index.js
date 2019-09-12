import onFieldClick from './sequences/onFieldClick'
import onMapClick from './sequences/onMapClick'
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
    onMapClick
  },
  modules: {
    BoundaryDrawing
  }
};
