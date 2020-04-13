## Libraries
### Polygon overlapping
https://www.npmjs.com/package/polygon-clipping
https://www.npmjs.com/package/martinez-polygon-clipping
https://www.npmjs.com/package/lineclip
https://www.npmjs.com/package/polybooljs

##Measurements
https://www.npmjs.com/package/cheap-ruler

##Large GEOJSON datasets to tiles
https://www.npmjs.com/package/geojson-vt

##Maps
https://github.com/react-native-mapbox-gl/maps


##Geohash:
https://www.npmjs.com/package/ngeohash
https://www.npmjs.com/package/geohash-poly
https://github.com/SHAINAAZ992/georaptor
https://github.com/Bonsanto/polygon-geohasher (Wish this was in javascript)
https://github.com/derrickpelletier/geohash-poly



fields: {
  fields: {
    <uuid>: <link to field> {

    }
  },
  farms: {
    <uuid>: <link to farm> {

    }
  }
}

season/2019: {
  fields: {
    <uuid>: <link to season field> {
      farm: <link to season farm>
      operations: {
        <uuid>: <link to operation>
      }
    }
  }
  farms: {
    <uuid>: <link to season farm>
  }
  operations: {
    <uuid>: <link to operation> {
      name: "Corn Planting",
      fields: {
        <uuid>: {
          status: "planned"
        }
      }
    }
  }
}





----------
- Does delete if watching a resource and deleting a link from it, but
  if deleting from an underlying resource it is always a merge?


Un-plan:
  #Removal of season field from operation (2019 is resource, operation is a resource, we are removing a key, not a resource):
    - Null Path: "/data/2019/operations/56461980-7cde-11ea-8d51-8d63fb37bb19/fields/7134a4b0-7ce2-11ea-976b-c70438ed0774"
    - data:
      2019.operations.<uuid>.fields.<uuid>: null
    - type: merge
    - wasDelete: true
    - Should do: MERGE
  #Removal of season field from itself (it's linked operation) (removes a key that is not a resource)
    - /data/2019/fields/7134a4b0-7ce2-11ea-976b-c70438ed0774/operations/56461980-7cde-11ea-8d51-8d63fb37bb19/fields/7134a4b0-7ce2-11ea-976b-c70438ed0774
    - data: path: null
    - type: merge
    - wasDelete: true
    - Should do: MERGE
  #Removal of operation from season field (removes a key that is a link)
    - "/data/2019/fields/7134a4b0-7ce2-11ea-976b-c70438ed0774/operations/56461980-7cde-11ea-8d51-8d63fb37bb19"
    - data: path: null
    - type: merge
    - wasDelete: true
    - Should do: MERGE

Delete a master field:
  - "/data/fields/07cc5200-7ce4-11ea-976b-c70438ed0774"
  - data: path: null
  - type: delete
  - wasDelete: true
  - Should do: DELETE

Delete a season field: (removes a key that is a resource)
  - "/data/2019/fields/7134a4b0-7ce2-11ea-976b-c70438ed0774"
  - data: path: null
  - type: merge
  - wasDelete: true


Delete a operation:
  - /data/2019/operations/81d04410-7ceb-11ea-8e5e-03ec8a9a7110
  - data: path: null
  - type: merge
  - wasDelete: true
  - Only deletes the link, doesn't delete the operation under season field
