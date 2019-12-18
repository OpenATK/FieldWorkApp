import oada from "@oada/cerebral-module/sequences";
import tree from '../tree';

function fetch({}) {
  let requests = [
    {
      path: '/bookmarks/fields/fields',
      tree,
      watch: {
        signals: ['OADAManager.onFieldChanged']
      }
    },
    {
      path: '/bookmarks/fields/farms',
      tree,
      watch: {
        signals: ['OADAManager.onFarmsChanged']
      }
    },
    {
      path: '/bookmarks/seasons',
      tree,
      watch: {
        signals: ['OADAManager.onSeasonsChanged',]
      },
    }
  ];
  return {requests};
}

export default [
  fetch,
  oada.get
]
