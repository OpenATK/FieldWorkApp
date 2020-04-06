import _state from './state'
import _actions from './actions'
import * as BoundaryDrawing from './BoundaryDrawing'

export const state = {
  BoundaryDrawing: BoundaryDrawing.state,
  ..._state
};
export const actions = {
  BoundaryDrawing: BoundaryDrawing.actions,
  ..._actions
}
