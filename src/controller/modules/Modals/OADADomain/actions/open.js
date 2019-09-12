import { set } from 'cerebral/factories'
import { moduleState } from "cerebral";

export default [
  set(moduleState`domain`, ''),
  set(moduleState`open`, true)
]
