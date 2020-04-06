import _ from 'lodash';

export default {
  open: false,
  selected: null,
  search: '',
  list: ({selected}, state) => {
    //Get operations, filtering by search
    let operations = null;
    if (_.get(state, 'app.OADAManager.connected') == true) {
      let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
      operations = _.get(state, `app.oada.${currentConnection}.bookmarks.seasons.2019.operations`); //TODO year
    } else {
      operations = _.get(state, `app.localData.abc123.seasons.2019.operations`) //TODO year, organization
    }
    const search = _.get(state, `view.TopBar.OperationDropdown.search`)
    return _.compact(_.map(operations, ({name, id}) => {
      if (id == null) return null; //Not an operation, a _key for oada
      if (search != '' && name.search(search) == -1) return null;
      return {
        text: name,
        value: id,
        selected: (selected == id),
        label: { color: 'green', empty: true, circular: true }
      }
    }))
  },
  selectedOperation: ({selected}, state) => {
    let operations = null;
    if (_.get(state, `app.OADAManager.connected`) == true) {
      let currentConnection = _.get(state, `app.OADAManager.currentConnection`)
      operations = _.omitBy(_.get(state, `app.oada.${currentConnection}.bookmarks.seasons.2019.operations`) || {}, (o, k) => {return _.startsWith(k, '_')}); //TODO year
    } else {
      operations = _.get(state, `app.localData.abc123.seasons.2019.operations`) //TODO year, organization
    }
    if (selected == null && _.keys(operations).length > 0) return operations[_.keys(operations)[0]];
    return operations[selected];
  }
}
