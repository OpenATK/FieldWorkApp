import { set } from 'cerebral/factories'
import { moduleState, props } from "cerebral";

export default [
  set(moduleState`selected`, props`id`),
  set(moduleState`open`, false)
]
