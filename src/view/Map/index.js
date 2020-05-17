import React, {useEffect, useRef}  from 'react';
import { Map as LeafletMap, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import './index.css'

import overmind from '../../overmind'
import _ from 'lodash'
import BoundaryDrawing from './BoundaryDrawing'
import Fields from './Fields'

export default function Map() {
  const { actions, state } = overmind();
  const myActions = actions.view.Map;
  const myState = state.view.Map;

  return (
      <LeafletMap bounds={myState.bounds} center={myState.center} zoom={myState.zoom} onClick={(evt) => myActions.onMapClick({...evt.latlng})} zoomControl={false}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
          minZoom={0}
          maxZoom={20}
          attribution=""
        />
        <BoundaryDrawing />
        <Fields />
      </LeafletMap>
  );
}
