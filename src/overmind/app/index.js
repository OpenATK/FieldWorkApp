import _state from './state'
import _actions from './actions'

import * as OADAManager from './OADAManager'

export const state = {
  OADAManager: OADAManager.state,
  ..._state
};
export const actions = {
  OADAManager: OADAManager.actions,
  ..._actions
}
