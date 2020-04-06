import _state from './state'
import _actions from './actions'

import * as FieldDetails from './FieldDetails'
import * as FieldList from './FieldList'
import * as Map from './Map'
import * as Modals from './Modals'
import * as TopBar from './TopBar'

export const state = {
  FieldDetails: FieldDetails.state,
  FieldList: FieldList.state,
  Map: Map.state,
  Modals: Modals.state,
  TopBar: TopBar.state,
  ..._state
};
export const actions = {
  FieldDetails: FieldDetails.actions,
  FieldList: FieldList.actions,
  Map: Map.actions,
  Modals: Modals.actions,
  TopBar: TopBar.actions,
  ..._actions
}
