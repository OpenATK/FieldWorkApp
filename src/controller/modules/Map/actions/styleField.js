/*
  Increase stroke size on field
*/
import { moduleState } from 'cerebral'

function highlightFieldFactory(fieldId) {
  function highlightField({ store, get }) {
    if (get(fieldId) != null) store.set(moduleState`fieldStyles.${fieldId}`, {weight: 5});
  }
  return highlightField
}
function unhighlightFieldFactory(fieldId) {
  function unhighlightField({ store, get }) {
    if (get(fieldId) != null) store.set(moduleState`fieldStyles.${fieldId}`, {weight: 3});
  }
  return unhighlightField
}

export default {
  highlight: highlightFieldFactory,
  unhighlight: unhighlightFieldFactory
}
