# Geohash index
{
  <geohash>: {
    <boundary-hash>: true //geohash rect is fully inside polygon,
    <boundary-hash>: false //geohash rect is partially inside polygon
  },
  ...
}

# Boundary-hash index
{
  <boundary-hash>: {
    geohashes: {
      aaaa: true, //geohash rect is fully inside polygon
      aaab: false //geohash rect is partially inside polygon
    },
  },
  ...
}

# Field Boundaries or Season Fields
{
  <boundary-hash>: {
    name: 'blah',
    boundary: <geojson>
  }
}

# Operations
{
  2019: {
    <operation-uuid>: {
      name: 'Corn Planting'
      boundaries: {  //These can be same boundaries as fields or different ones entirely (parts of fields)
        <boundary-hash>: {
          boundary: <geojson>,
        }
      }
    }
  }
}

or

#Boundary-Operations
{
  <boundary-hash>: {
    boundary: <geojson>,
    operations: {
      <operation-uuid>: <link to operation>
    }
  }
}

#Operation
{
  name: 'Corn Planting',
  year: 2019
  boundaries: {
    <boundary-hash>: <Boundary Operation>
  }
}

#Geohash indexer
{
  <geohash>: {
    <boundary-hash>: {
      boundaryOperations: {
          <link to boundary-operation>
      },
      fullyInclosed: true
    }
  }
}



# Algos:

## Finding field history from an operation's boundary
  - Use boundary-hash index to get all geo-hashes from a boundary
  - Obtain list of all boundary-operations for the cooresponding geohashes using geohash-index
  - If not fully inclosed use polygon clipping to see if within my boundary
  - Get list of operation uuids from boundary-operations that are within my boundary
  - Lookup operations for each boundary-operation

## Finding all boundaries for an operation
  - Get all geohashes in viewport and the cooresponding boundary hashes
  - Get all boundaries with those hashes
  - If they contain your operation then show them
