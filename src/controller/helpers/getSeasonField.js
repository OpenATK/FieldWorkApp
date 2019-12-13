import { state } from 'cerebral'

export default function getSeasonField(get, id) {
  let fields = [];
  if (get(state`OADAManager.connected`) == true) {
    let currentConnection = get(state`OADAManager.currentConnection`)
    fields = get(state`oada.${currentConnection}.bookmarks.seasons.2019.fields`) //TODO year
  } else {
    fields = get(state`localData.abc123.seasons.2019.fields`) //TODO year, organization
  }
  console.log('fields', fields)
  return fields[id];
}
