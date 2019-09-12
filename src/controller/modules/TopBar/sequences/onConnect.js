import { sequences } from "cerebral";

function openOADADomainModal({get}) {
  get(sequences`Modals.OADADomain.onOpen`)()
}

export default [
  openOADADomainModal
]
