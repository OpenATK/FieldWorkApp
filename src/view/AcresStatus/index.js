import React, { Component } from 'react';
import { Text, View } from 'react-native';

import AcresPlanned from './AcresPlanned'

export default class AcresStatus extends Component {
  render() {
    return (
      <View style={{position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", top: 68, zIndex: 1202, width: '100vw'}}>
        <AcresPlanned />
      </View>
    );
  }
}
