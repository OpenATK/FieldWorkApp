import { set } from 'cerebral/factories'
import { moduleState, props } from "cerebral";

import changeFieldStatus from '../actions/changeFieldStatus';


export default [
  //set(moduleState`selected`, props`id`),
  //set(moduleState`open`, false)
  changeFieldStatus
]
