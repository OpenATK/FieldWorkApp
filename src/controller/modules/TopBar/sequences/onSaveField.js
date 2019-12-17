import { sequences, state } from "cerebral"
import { set } from 'cerebral/factories'

function openSaveFieldModal({get}) {
  get(sequences`Modals.SaveField.onOpen`)()
}

export default [
  openSaveFieldModal
]
