import oada from "@oada/cerebral-module/sequences";
import tree from '../tree';

function fetch({}) {
  let requests = [
    {
      path: '/bookmarks/fields',
      tree,
      /*watch: {
        signals: ['toggleTitle',]
        // signals: ['notes.handleNotesWatch',]
      },*/
    },
    {
      path: '/bookmarks/seasons',
      tree,
      /*watch: {
        signals: ['notes.mapOadaToRecords',]
        // signals: ['notes.handleNotesWatch',]
      },*/
    }
  ];
  return {requests};
}

export default [
  fetch,
  oada.get
]
