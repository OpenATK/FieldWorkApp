import tree from './tree';
import config from '../../../config'
import Promise from 'bluebird'
import _ from 'lodash'
import { browser as oadaIdClient } from '@oada/oada-id-client/index.js'
const getAccessToken = Promise.promisify(oadaIdClient.getAccessToken)

export default {
  async getToken({}, domain) {
    /*
      Get token from local storage or request one
    */
    //TODO get token from local storage
    let res = await getAccessToken(domain.replace(/^https?:\/\//, ''), {
      metadata: config.METADATA,
      scope: config.SCOPE,
      redirect: config.REDIRECT
    })
    //TODO save token to local storage
    return res.access_token;
  },
  async connect({actions, state, effects}, {domain}) {
    const myState = state.app.OADAManager;
    const myActions = actions.app.OADAManager;

    const token = await myActions.getToken(domain);
    return actions.app.oada.connect({
      token,
      domain: domain,
      options: config.OPTIONS
    }).then((response) => {
      if (!response.error) {
        myState.currentConnection = response.connectionId;
        myState.token = response.token;
        myState.connected = true;
        //Unselect local opeation
        state.view.TopBar.OperationDropdown.selected = null;
      }
      return response;
    })
  },
  async fetchAndWatch({actions, state}) {
    const myState = state.app.OADAManager;
    const {currentConnection: connection_id} = myState;
    //Fetch field and seasons
    let watchRequests = [
      {
        path: '/bookmarks/fields',
        tree,
        watch: {
          actions: [actions.app.OADAManager.onFieldChanged]
        }
      },
      {
        path: '/bookmarks/seasons',
        tree,
        watch: {
          actions: [actions.app.OADAManager.onSeasonsChanged]
        },
      }
    ];
    const ret = await actions.app.oada.get({requests: watchRequests, connection_id})
    let rewatchRequests = [];
    if (ret.responses[0].error) {
      //On 404 create and rewatch
      if (ret.responses[0].status != 404) throw ret.responses[0].error;
      //Create fields and try to watch again
      let requests = [{
        tree,
        data: {
          fields: {},
          farms: {}
        },
        path: '/bookmarks/fields'
      }];
      //Create
      await actions.app.oada.put({requests, connection_id})
      //Rewatch
      rewatchRequests.push(watchRequests[0]);
    }
    if (ret.responses[1].error) {
      //On 404 create and rewatch
      if (ret.responses[1].status != 404) throw ret.responses[0].error;
      //Create seasons and try to watch again
      let requests = [{
        tree,
        data: {},
        path: '/bookmarks/seasons'
      }];
      //Create
      await actions.app.oada.put({requests, connection_id})
      //Rewatch
      rewatchRequests.push(watchRequests[1]);
    }
    if (rewatchRequests.length > 0) await actions.app.oada.get({requests: rewatchRequests, connection_id})
  },
  initSeasonFields({state, actions}) {
    /*
      Put changes from master field list into season fields
    */
    const myActions = actions.app.OADAManager;
    //Get master field list fields
    var fieldsChanged = [];
    _.forEach(_.get(state, 'app.oadaOrgData.fields.fields'), (obj, key) => {
      if (_.startsWith(key, '_')) return;
      fieldsChanged.push({fieldId: key, name: obj.name, boundary: obj.boundary});
    })
    return myActions.changeSeasonFields(fieldsChanged);
  },
  initSeasonFarms({state, actions}) {
    /*
      Put changes from master farm list into season farms
    */
    const myActions = actions.app.OADAManager;
    //Get master field list fields
    var changed = [];
    _.forEach(_.get(state, 'app.oadaOrgData.fields.farms'), (obj, key) => {
      if (_.startsWith(key, '_')) return;
      changed.push({id: key, name: obj.name});
    })
    return myActions.changeSeasonFarms(changed);
  },
  async changeSeasonFields({state, actions}, fieldsChanged) {
    /*
      Apply any changes to season fields
    */
    const myState = state.app.OADAManager;
    const {currentConnection: connection_id} = myState;
    //See if they match season fields.
    let requests = [];
    let theSeasonFields = state.app.seasonFields;
    _.forEach(fieldsChanged, (fieldChange) => {
      let data = {};
      let seasonField = theSeasonFields[fieldChange.fieldId]
      if (fieldChange.name) {
        if (seasonField == null || seasonField.name != fieldChange.name) {
          data.name = fieldChange.name;
        }
      }
      if (fieldChange.boundary) {
        if (seasonField == null || _.isEqual(seasonField.boundary, fieldChange.boundary) == false) {
          data.boundary = fieldChange.boundary;
        }
      }
      if (_.isEmpty(data)) return;
      data.id = fieldChange.fieldId;
      requests.push(
        { //Change season's field's name, boundary
          tree,
          data,
          type: 'application/vnd.oada.field.1+json',
          path: `/bookmarks/seasons/2019/fields/${fieldChange.fieldId}` //TODO year
        }
      )
    })
    if (requests.length == 0) return;
    await actions.app.oada.put({requests, connection_id})
  },
  async changeSeasonFarms({state, actions}, changed) {
    /*
      Apply any changes to season fields
    */
    const myState = state.app.OADAManager;
    const {currentConnection: connection_id} = myState;
    //See if they match season fields.
    let requests = [];
    let seasonFarms = state.app.seasonFarms;
    _.forEach(changed, (change) => {
      let data = {};
      let seasonFarm = seasonFarms[change.id]
      //Check if name changed
      if (change.name) {
        if (seasonFarm == null || seasonFarm.name != change.name) {
          data.name = change.name;
        }
      }
      if (_.isEmpty(data)) return;
      data.id = change.id;
      requests.push(
        { //Change season's farms's name
          tree,
          data,
          type: 'application/vnd.oada.farm.1+json',
          path: `/bookmarks/seasons/2019/farms/${data.id}` //TODO year
        }
      )
    })
    if (requests.length == 0) return;
    await actions.app.oada.put({requests, connection_id})
  },
  async onDomainChanged({actions, state}, {domain}) {
    const myState = state.app.OADAManager;
    const myActions = actions.app.OADAManager;
    myState.domain = domain;
    const {error} = await myActions.connect({domain});
    if (!error) {
      await myActions.fetchAndWatch();
      await myActions.initSeasonFarms();
      await myActions.initSeasonFields();
    }
  },
  onFieldChanged({state, actions}, props) {
    /*
      If a field in the master list changed, apply change to this years season fields
    */
    const myActions = actions.app.OADAManager;
    let changeType = _.get(props, 'response.change.type');
    if (changeType == 'merge') {
      var fieldsChanged = [];
      _.forEach(_.get(props, 'response.change.body.data.fields'), (obj, key) => {
        if (_.startsWith(key, '_')) return;
        fieldsChanged.push({fieldId: key, name: obj.name, boundary: obj.boundary});
      })
      return myActions.changeSeasonFields(fieldsChanged);
    } else {
      console.warn("onFieldChanged: Unsupported change type:", changeType)
    }
  },
  onFarmsChanged() {
    //TODO If a farm in the master list changed, apply change to this years season farm
    console.log('TODO: If a farm in the master list changed, apply change to this years season farm')
  },
  onSeasonsChanged({state, actions}, props) {

  }
}
