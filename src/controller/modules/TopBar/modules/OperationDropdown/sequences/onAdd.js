import { sequences } from "cerebral";

function openNewOperationModal({get}) {
  get(sequences`Modals.NewOperation.onOpen`)()
}

export default [
  openNewOperationModal
]
