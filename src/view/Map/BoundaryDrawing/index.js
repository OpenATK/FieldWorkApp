/*
  Adds points/polygons to map when drawing a boundary
*/
import React, { Component } from 'react';
import { Marker, Polygon, LayerGroup } from 'react-leaflet'

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'
import _ from 'lodash';

export default connect(
  {
    boundary: state`Map.BoundaryDrawing.boundary`,
    drawing: state`Map.BoundaryDrawing.drawing`,
    onMarkerMove: sequences`Map.BoundaryDrawing.onMarkerMove`
  },
  function BoundaryDrawing({ drawing, boundary, onMarkerMove}) {
    if (!drawing) return null;
    return (
      <LayerGroup>
        <Polygon positions={_.map(boundary)} />
        {_.map(boundary, (latlng, id) => <Marker position={latlng} key={id} draggable onMove={({latlng, oldLatLng}) => onMarkerMove({latlng, oldLatLng, id})}/>)}
      </LayerGroup>
    );
  }
)
