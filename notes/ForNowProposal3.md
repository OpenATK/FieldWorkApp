oada-fields (bookmarks/fields): {
  growers: {
    <uuid>: {
      farms: {
        <uuid>: <link>
      }
    }
  },
  farms: {
    <uuid>: {
      grower: <link>
      fields: {
        <uuid>: <link>
      }
    }
  },
  fields: {
    <uuid>: {
      grower: <link>,
      farm: <link>,
      name:
      boundary: <geojson>
    }
  }
}

field-work: {
  geohashes: { //Don't need geohashes yet if we don't want
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
            name: "Back 40",
            status: "Planned"
          }
        }
      }
    }
  }
}
    Boundary changes current year:
      - Get old boundary hash, in current year's operations update all fields with old boundary hash to new boundary hash/boundary.
      - In fields move all 2019 operations from old boundary hash to a new boundary hash
        - If not using geohashes would need a old boundary list here or something
      - Add new boundary-hash to geohash index
    Boundary changes all years:
      - Get old boundary hash, in all operations update all fields with old boundary hash to new boundary hash/boundary.
      - In fields change all old bounary-hashes to new boundary hashes
      - Remove all old boundary-hashes from geohash index
      - Add new boundary-hash to geohash index
    A new boundary is added:
      - Add boundary to all current year operations

//The issue with not using boundary-hashes is when a oada-field changes it doesn't get a new uuid
  and if older operations don't want the boundaries to change then there geohashed indexes can't change
  so they would need replaced with new uuids. Or we can have the geohash point to the operation/fields/uuid
  and that uuid wouldn't need to match the uuid from bookmarks/fields. Could probably use another random uuid instead of boundary hash. Then when an oada-field changes you'd use the geohash to find all the operation/field/uuid's and compare if they are exactly the same, then change them if necessary. If they change then the geohash index would need updated accordingly. This approach would be as Aaron suggested, each operation/field pair would produce one entry in the geohash index. But you would no longer need the intermediate /fields index.

/*Or when a oada-field changes it always becomes a new resource. But requires burden of field changes to be on OADA.*/
- If we want the field to change for an operation when changes via oada, how do we know the old one?
fields: {

}
farms: {

}
growers: {

}
field-work: {
  geohash: {  //Unneeded at first
    xxa: {
      <field-id>: true
    }
  }
  fields: {
    <id>: {
      field: <link to bookmarks/fields>
      operations: {
        <operation-id>: <link to operation>
      }
    }
  },
  operations: {
    2019: {
      <operation-uuid>: {
        name: 'Corn Planting',
        year: 2019,
        fields: {
          <field-id>: {
            field: <link to bookmarks/fields>,
            status: "Planned"
          }
        }
      }
    },
    2018: {}
  }
}

/bookmarks/fields - Current list of fields for current season.
  - If change field for current season maintain the current field id.
  - If change field and it's a new season, archive old field in archive list. maybe /bookmarks/fields/2017/ or something.
  - If past boundary changes.
Boundary changes current year (field is from previous year):
  - For all current year operations, update old field id (how to get it?) to new field id/links.
  - In fields move all 2019 operations from old field id to a new field id
    - If not using geohashes would need a old field list here or something (maybe copy all old operations to new field id, but we'd lose the where)
  - Add new field-id to geohash index
Boundary changes current year (field is from current year):
  - Update geo-hash index
A new boundary is added:
  - Add new field-id to all current year operations
  - Add to geo-hash index

/*Requires oada to always make a new resource when a field changes and it is a new season, and remove the old field from /bookmarks/fields master list, leaving it as a resource only or put in an archive list.
This would also have to update farms/growers links the same way?*/





Can we do a for now without the geohashes but still having boundary hashes??

//When oada-field changes:
  - hash OLD boundary
  - lookup operations where boundary exists
