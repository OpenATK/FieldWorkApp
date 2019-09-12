/*
  Adds points/polygons to map when drawing a boundary
*/
import React, { Component } from 'react';
import { Marker, Polygon, LayerGroup, GeoJSON } from 'react-leaflet'

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import _ from 'lodash';
import uuid from 'uuid/v1'

export default connect(
  {
    fields: state`Map.fields`,
    onClick: sequences`Map.onFieldClick`
  },
  function Fields({ fields, onClick }) {
    if (_.keys(fields).length == 0) return null;
    return (
      <LayerGroup>
        {_.map(fields, (field) =>
          <GeoJSON
            bubblingMouseEvents={false}
            style={field.style}
            data={field.boundary}
            key={uuid()} //Must be uuid to unmount/mount when field style or boundary changes
            onClick={(evt) => {onClick({id: field.id})}} />
        )}
      </LayerGroup>
    );
  }
)
