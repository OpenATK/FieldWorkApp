# Boundary Index

{
  <boundary-hash>: {
    geohashes: {
      aaaa: true, //geohash rect is fully inside polygon
      aaab: false //geohash rect is partially inside polygon
    },
    name: 'blah',
    boundary: <geojson>,
    boundaryHash: <hash of geojson>
  },
  ...
}

# Geohash index
{
  <geohash>: {
    <boundary-hash>: true //geohash rect is fully inside polygon,
    <boundary-hash>: false //geohash rect is partially inside polygon
  },
  ...
}

# Operation index
{
  <boundary-hash>: {
    boundary: <geojson>,
    operations: {
      2019: {
        'Corn Planting': {

        }
      }
    }
  }

}

# Algos:

## Finding field history from boundary
  - Get all geohashes from boundary
  - Obtain list of all boundary hashes for the cooresponding geohashes using geohash index
  - Get operation data/boundaries using boundary hashes
  - For the partially contained use polygon clipping algo to see how much if any of the two polygons intersect.

## Finding all boundaries for an operation
  - Get all geohashes in viewport and the cooresponding boundary hashes
  - Get all boundaries with those hashes
  - If they contain your operation then show them


  https://hackernoon.com/putting-chinas-second-hand-economy-on-the-map-with-geohash-matching-f6eb7626ff96
  https://github.com/mapbox/lineclip
