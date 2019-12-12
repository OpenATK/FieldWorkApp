
import onDomainChanged from './sequences/onDomainChanged'
import onFieldChanged from './sequences/onFieldChanged'

export default {
  state: {
    connected: false
  },
  sequences: {
    onDomainChanged,
    onFieldChanged
  },
  modules: {

  }
};
