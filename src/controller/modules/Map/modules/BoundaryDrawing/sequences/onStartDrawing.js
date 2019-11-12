import { set } from 'cerebral/factories'
import { moduleState } from "cerebral";

function prepBoundary({props, store}) {
  let boundary = props.boundary || {};
  store.set(moduleState`boundary`, boundary)
}

export default [
  prepBoundary,
  set(moduleState`drawing`, true)
]
