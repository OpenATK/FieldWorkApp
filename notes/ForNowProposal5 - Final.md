
growers: {
  <grower-uuid>: {}
}
farms: {
  <farm-uuid>: {}
}
fields: {
  field-uuid: (field-resource) {
    name: 'Back 40',
    boundary: <boundary-uuid>,
    farm: <farm-uuid>,
    grower: <grower-uuid>
  }
}
---------------
season: {
  2019: {
    fields: {

    }
    operations: {

    }
  }
}
season-fields: {
  2019: {
    <field-uuid>: {
      id: <season-field-uuid>,
      field-uuid: <field-uuid>,
      season: 2019,
      boundary: <geo-json>,
      operations: {
        <operation-uuid>
      }
    }
  },
  2018: {
    <field-uuid>: {
      id: <season-field-uuid>,
      field-uuid: <field-uuid>,
      season: 2018,
      boundary: <geo-json>,
      operations: {
        <operation-uuid>
      }
    }
  }
}
operations: {
  2019: {
    <operation-uuid>: {
      year: 2019,
      name: 'Corn Planting',
      fields: {
        <field-uuid> or <season-field-uuid>: {
          status: Planned
        }
      }
    }
  },
  2018: {

  }
}

geohash tables:
------
- Given a boundary, i need to be able to find operations.
- Given a boundary or hash, we want all operations that reside in there.
- Given a boundary or hash, we want all related boundaries that reside there.

operations-geohash: {
  <geo-a>: {
    2019: {
      <season-field-uuid>: true/false (if it is totally inside, false is partially inside)
    }
  }
}
