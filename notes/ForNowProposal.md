

operations: {
  fields: {
    <uuid>: {
      boundary: <link-to-bookmarks/fields/field>,
      operations: {
        <operation-id>:
      }
    }
  },
  years: {
    2019: {
      <operation-uuid>: {
        name: 'Corn Planting',
        year: 2019,
        boundaries: {
          <uuid>or<boundary-hash>: { //(if not boundary hash need to supply boundary in one of the indexes)
            boundary: <geojson>
          }
        }
      }
    }
  }
}


operations: {
  fields: {
    <uuid>: {
      boundary: <link-to-bookmarks/fields/field>,
      operations: {
        <operation-id>:
      }
    }
  },
  years: {
    2019: {
      <operation-uuid>: {
        name: 'Corn Planting',
        year: 2019,
        boundaries: {
          field: <link-back-to-boundary?>,
          <uuid>or<boundary-hash>: { //(if not boundary hash need to supply boundary in one of the indexes)
            boundary: <geojson>
          }
        }
      }
    }
  }
}
