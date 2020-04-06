import React, { Component } from 'react';
import { Text, View } from 'react-native';

import overmind from '../../../overmind'

export default function AcresPlanned() {
  const {state} = overmind();
  const myState = state.view.FieldDetails;
  const { acresStatus, selectedOperation } = myState;

  if (selectedOperation == null) return null;
  return (
    <View style={{backgroundColor: '#c50003', paddingLeft: 7, paddingRight: 7, paddingTop: 5, paddingBottom: 5, borderRadius: 5}}>
      <Text style={{color: 'white', textShadowColor: '#000', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2}}>
        {`${acresStatus.planned} ac (${acresStatus.plannedPercentage}%)`}
      </Text>
    </View>
  );
}
