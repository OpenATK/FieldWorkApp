import { sequences, state } from "cerebral";
import { set } from 'cerebral/factories'

function onCancelField({get}) {
  get(sequences`Map.BoundaryDrawing.onStopDrawing`)()
}
export default [
  set(state`Map.editingField`, null), //Stop editing if we were
  onCancelField
]
