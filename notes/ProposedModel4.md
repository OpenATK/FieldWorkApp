# Boundary:
{
  boundary: <geojson>
}
//Convert to --->
{
  boundary: <geojson>,
  boundaryHash: <hash of geojson>,
  geohashes: {
    aaaa: true, //geohash rect is fully inside polygon
    aaab: false //geohash rect is partially inside polygon
  }
}

#INDEX_A: Operation-Boundary geo-hash index (gives boundaries inside of geo-hashes)
{
  <geohash>: {
    <boundary-hash>: {
      boundary: <link to boundary or geojson>? (maybe only include if fully-inclosed false?),
      fullyInclosed: true
    }
  }
}

#INDEX_B: Operation boundary-hash index
{
  2019: {
    <boundary-hash>: {
      boundary: <geojson>?,
      operations: {
        <operation-uuid>: <link to operation>,
        ...
      }
    }
  },
  ...
}
//or
{
  <boundary-hash>: {
    boundary: <geojson>?,
    operations: {
      2019: {
        <operation-uuid>: <link to operation>,
        ...
      },
      ...
    }
  }
}


#Operations
{
  2019: {
    <operation-uuid>: {
      name: 'Corn Planting',
      boundaries: {
        <uuid>or<boundary-hash>: { //(if not boundary hash need to supply boundary in one of the indexes)
          boundary: <geojson>
        }
      }
    }
  }
}


# Algos:

## Finding field history from boundary
  - First get all boundaries that are inside of my boundary (or same as my boundary)
    - Compute boundary hash and geohashes for my current boundary
    - Use INDEX_A to find boundary-hashes that are inside of my boundary, or possibly inside
      - If geojson boundary is included in INDEX_A use it with polygon clipping to reduce list.
    - Use INDEX_B to find operations for those boundary-hashes
    - Use Operations to find operation info for those boundary-hashes and the boundaries themselves (if we don't have them)
      - Use polygon clipping if only partially inclosed with INDEX_A and if geojson isn't included in INDEX_A.

## Finding all boundaries for an operation (in a viewport)
  - Get all geohashes in viewport
  - Get all boundary-hashes in viewport using INDEX_A
  - Only load those boundary-hashes from Operations
