import { set } from 'cerebral/factories'
import { moduleState } from "cerebral";

export default [
  set(moduleState`name`, ''),
  set(moduleState`open`, true)
]