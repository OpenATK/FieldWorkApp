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
    let requests = [
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
    await actions.app.oada.get({requests, connection_id})
  },
  async initBookmarks({state, actions}) {
    const myState = state.app.OADAManager;
    const {currentConnection: connection_id} = myState;
    if (!state.app.oadaOrgData.fields) {
        let requests = [{
          tree,
          data: {},
          path: '/bookmarks/fields'
        },
        {
          tree,
          data: {},
          path: '/bookmarks/fields/fields'
        },
        {
          tree,
          data: {},
          path: '/bookmarks/fields/farms'
        }];
        await actions.app.oada.put({requests, connection_id})
    }
    if (!state.app.oadaOrgData.seasons) {
      let requests = [{
        tree,
        data: {},
        path: '/bookmarks/seasons'
      }];
      await actions.app.oada.put({requests, connection_id})
    }
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
          console.log('Season Field Boundary:', JSON.stringify(seasonField.boundary, 2))
          console.log('fieldChange Boundary:', JSON.stringify(fieldChange.boundary, 2))
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
  async onDomainChanged({actions, state}, {domain}) {
    const myState = state.app.OADAManager;
    const myActions = actions.app.OADAManager;
    myState.domain = domain;
    const {error} = await myActions.connect({domain});
    if (!error) {
      //await myActions.fetchAndWatch();
      //await myActions.initBookmarks();
      //await myActions.initSeasonFields();
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
    }
  },
  onFarmsChanged() {

  },
  onSeasonsChanged() {

  }
}
