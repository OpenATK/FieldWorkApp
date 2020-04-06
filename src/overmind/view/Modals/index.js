import _state from './state'
import _actions from './actions'
import * as SaveField from './SaveField'
import * as NewOperation from './NewOperation'

export const state = {
  SaveField: SaveField.state,
  NewOperation: NewOperation.state,
  ..._state
};
export const actions = {
  SaveField: SaveField.actions,
  NewOperation: NewOperation.actions,
  ..._actions
}
