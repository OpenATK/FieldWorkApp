import { set } from 'cerebral/factories'
import { moduleState } from "cerebral";

export default [
  set(moduleState`drawing`, false),
  set(moduleState`boundary`, {})
]
