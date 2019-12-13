import { set } from 'cerebral/factories'
import { moduleState } from "cerebral";

export default [
  set(moduleState`domain`, 'https://localhost'), //TODO remove default
  set(moduleState`open`, true)
]
