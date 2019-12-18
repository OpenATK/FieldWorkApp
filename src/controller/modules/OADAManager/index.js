
import onDomainChanged from './sequences/onDomainChanged'
import onFieldChanged from './sequences/onFieldChanged'
import onFarmsChanged from './sequences/onFarmsChanged'
import onSeasonsChanged from './sequences/onSeasonsChanged'

export default {
  state: {
    connected: false
  },
  sequences: {
    onDomainChanged,
    onFieldChanged,
    onFarmsChanged,
    onSeasonsChanged
  },
  modules: {

  }
};
