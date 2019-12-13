
growers: {
  <grower-uuid>: {}
}
farms: {
  <farm-uuid>: {}
}
fields: {
  <field-uuid>: (field-resource) {
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
      <field-uuid>: {
        id: <field-uuid>,
        season: 2019,
        boundary: <geo-json>,
        operations: {
          <operation-uuid>: <link-to-operation>
        }
      }
    }
    operations: {
      <operation-uuid>: {
        id: <operation-uuid>,
        season: 2019,
        name: 'Corn Planting',
        fields: {
          <field-uuid>: {
            field: <link-to-field>,
            status: Planned
          }
        }
      }
    }
  }
}
