import React, { Component } from 'react';
import { Text, View } from 'react-native';

import overmind from '../../../overmind'

export default function AcresDone() {
  const {state} = overmind();
  const myState = state.view.FieldDetails;
  const { acresStatus, selectedOperation } = myState;
  
  if (selectedOperation == null) return null;
  return (
    <View style={{backgroundColor: '#5bb25f', paddingLeft: 7, paddingRight: 7, paddingTop: 5, paddingBottom: 5, borderRadius: 5}}>
      <Text style={{color: 'white', textShadowColor: '#000', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2}}>
        {`${acresStatus.done} ac (${acresStatus.donePercentage}%)`}
      </Text>
    </View>
  );
}
