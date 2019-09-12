import { sequences } from "cerebral";

function onCancelField({get}) {
  get(sequences`Map.BoundaryDrawing.onStopDrawing`)()
}
export default [
  onCancelField
]
