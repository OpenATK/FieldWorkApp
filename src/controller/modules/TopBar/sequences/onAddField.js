import { sequences } from "cerebral";

function onAddField({get}) {
  get(sequences`Map.BoundaryDrawing.onStartDrawing`)()
}
export default [
  onAddField
]
