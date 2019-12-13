import _ from 'lodash';
import changeSeasonFields from '../actions/changeSeasonFields';

function onFieldChanged({props, get, store}) {
  let changeType = _.get(props, 'response.change.type');
  if (changeType == 'merge') {
    var fieldsChanged = [];
    _.forEach(_.get(props, 'response.change.body'), (obj, key) => {
      if (_.startsWith(key, '_')) return false;
      fieldsChanged.push({fieldId: key, name: obj.name, boundary: obj.boundary});
    })
    return {fieldsChanged};
  }
}

export default [
  onFieldChanged,
  changeSeasonFields
]
