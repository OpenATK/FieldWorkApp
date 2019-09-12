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

---> Geo hash indexer:
{
  <geohash>: {
    <boundary-hash>: {
      fullyInclosed: true (is the geo-rect fully inside the boundary)
    },
    ...
  }
}


# Algos:

## Finding field history from an operation's boundary
  - Get all geohashes that are on the screen
  - Get list of all boundary-hashs inside those geohashes
  -
  - Obtain list of all boundary hashes for the cooresponding geohashes
  - Get operation data/boundaries using boundary hashes
  - For the partially contained use polygon clipping algo to see how much if any of the two polygons intersect.

## Finding all boundaries for an operation
  - Get all geohashes in viewport and the cooresponding boundary hashes
  - Get all boundaries with those hashes
  - If they contain your operation then show them
