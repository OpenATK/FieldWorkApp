import { sequence } from 'cerebral/factories'
import unselectField from '../actions/unselectField'

export default sequence('Map.unselectField', [
  unselectField
])
