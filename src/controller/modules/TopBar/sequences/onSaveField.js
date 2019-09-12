import { sequences } from "cerebral";

function openSaveFieldModal({get}) {
  get(sequences`Modals.SaveField.onOpen`)()
}

export default [
  openSaveFieldModal
]
