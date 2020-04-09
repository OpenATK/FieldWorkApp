import React from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import './index.css'

import overmind from '../../overmind'
import _ from 'lodash'
import BoundaryDrawing from './BoundaryDrawing'
import Fields from './Fields'

export default function Map() {
  const { actions, state } = overmind();
  const myActions = actions.view.Map;
  return (
      <LeafletMap center={[41.448068, -84.972648]} zoom={13} onClick={(evt) => myActions.onMapClick({...evt.latlng})} zoomControl={false}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <BoundaryDrawing />
        <Fields />
      </LeafletMap>
  );
}
