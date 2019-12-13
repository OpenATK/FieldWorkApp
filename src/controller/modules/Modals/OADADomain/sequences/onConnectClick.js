import { moduleState, sequences } from 'cerebral'
import { set } from 'cerebral/factories'

function notifyDomainChanged({get}) {
  var domain = get(moduleState`domain`);
  get(sequences`OADAManager.onDomainChanged`)({domain})
}

export default [
  notifyDomainChanged,
  set(moduleState`open`, false)
]
