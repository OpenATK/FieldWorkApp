import React, { Component } from 'react';
import { Text, View } from 'react-native';

import AcresPlanned from './AcresPlanned'
import AcresStarted from './AcresStarted'
import AcresDone from './AcresDone'

export default class AcresStatus extends Component {
  render() {
    return (
      //z-index of leaflet map is 400
      <View style={{position: "absolute", display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", top: 68, zIndex: 401, width: '100vw'}}>
        <AcresPlanned />
        <AcresStarted />
        <AcresDone />
      </View>
    );
  }
}
