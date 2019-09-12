
growers: {
  <grower-uuid>: {}
}
farms: {
  <farm-uuid>: {}
}
fields: {
  field-uuid: {
    boundary: <boundary-uuid>,
    farm: <farm-uuid>,
    grower: <grower-uuid>
  }
}
---------------
season-fields: {
  2019: {
    <season-field-uuid>: {
      season: 2019,
      field: <field-uuid>
    }
  },
  2018: {
    <season-field-uuid>: {
      season: 2018,
      field: <field-uuid>
    }
  }
}

operations: {
  2019: {
    <operation-uuid>: {
      year: 2019,
      name: 'Corn Planting',
      season-field: <season-field-uuid>,
      field: <field-uuid>
    }
  },
  2018: {

  }
}
