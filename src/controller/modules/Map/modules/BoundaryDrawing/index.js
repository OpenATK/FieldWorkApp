import { state } from "cerebral";
import { set } from "cerebral/factories";

import onMapClick from './sequences/onMapClick';
import onMarkerMove from './sequences/onMarkerMove';
import onStartDrawing from './sequences/onStartDrawing';
import onStopDrawing from './sequences/onStopDrawing';

export default {
  state: {
    boundary: {},
    drawing: false
  },
  sequences: {
    onMapClick,
    onMarkerMove,
    onStartDrawing,
    onStopDrawing
  }
};
