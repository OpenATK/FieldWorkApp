import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './index.css'

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

import BoundaryDrawing from './BoundaryDrawing'
import Fields from './Fields'

export default connect(
  {
    onClick: sequences`Map.onMapClick`
  },
  function Map({ foo, onClick }) {
    return (
        <Map center={[40.630162850630974, 276.11022041179245]} zoom={13} onClick={(evt) => onClick({...evt.latlng})}>
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
          <BoundaryDrawing />
          <Fields />
        </Map>
    );
  }
)
