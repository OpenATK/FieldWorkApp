operations: {
  fields: {
    <uuid>: {
      boundary: <link-to-bookmarks/fields/field>
    }
  },
  years: {
    2019: {
      <operation-uuid>: {
        name: 'Corn Planting',
        year: 2019,
        fields: {
          <uuid>: {
            boundary: <geojson>,
            name: "Back 40",
            geohashes: {
              xxxa: true,
              xxxb: false
            }
          }
        }
      }
    }
  },
  geohashes: {
    xxxa: {
      <operation-uuid>/fields/<field-uuid>,
    }
  },

  ----------------------------
  //When a field get modified, have to reindex it. When it gets added it needs indexed. (Maybe when it gets status changed it checks)
  //When I edit a field boundary it can't change for past operations... So when it is edited the old geohashes need a new uuid??? That may be why a boundary hash should be used in field work.
  geohashes: {
    xxxa: {
      <field-uuid>: true/false
    }
  },
  fields: {
    <field-uuid>: {
      operations: {
        2019: {
          <operation-uuid>: <link to operation>
        }
      }
    }
  }
  --------------------------------
  oada-fields (bookmarks/fields): {
    <uuid>: {
      name:
      boundary: <geojson>
    }
  }
  geohashes: {
    xxxa: {
      <boundary-hash>: true/false
    }
  },
  fields: {
    <boundary-hash>: {
      operations: {
        2019: {
          <operation-uuid>: <link to operation>
        }
      }
    }
  },
  operations: {
    2019: {
      <operation-uuid>: {
        name: 'Corn Planting',
        year: 2019,
        fields: {
          <boundary-hash>: {
            boundary: <geojson>,
            name: "Back 40"
          }
        }
      }
    }
  }
}


- Don't need very high geohash precision.
