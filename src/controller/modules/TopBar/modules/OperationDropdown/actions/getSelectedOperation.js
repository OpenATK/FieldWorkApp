function getSelectedOperation({get}) => {
  let operations = null;
  if (get(state`OADAManager.connected`) == true) {
    let currentConnection = get(state`OADAManager.currentConnection`)
    operations = _.omitBy(get(state`oada.${currentConnection}.bookmarks.seasons.2019.operations`) || {}, (o, k) => {return _.startsWith(k, '_')}); //TODO year
  } else {
    operations = get(state`localData.abc123.seasons.2019.operations`) //TODO year, organization
  }
  const selectedOperation = get(state`TopBar.OperationDropdown.selected`) //Can't use moduleState here or won't rerun when change occurs
  if (selectedOperation == null && _.keys(operations).length > 0) return operations[_.keys(operations)[0]];
  return operations[selectedOperation];
}

export default [
  getSelectedOperation
]
