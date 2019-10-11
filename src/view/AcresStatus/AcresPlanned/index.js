import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { state } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect({
  selectedOperation: state`TopBar.OperationDropdown.selectedOperation`,
  acresStatus: state`acresStatus`,
}, function AcresPlanned({acresStatus, selectedOperation}) {
  return (
    <View style={{backgroundColor: '#c50003', paddingLeft: 7, paddingRight: 7, paddingTop: 5, paddingBottom: 5, borderRadius: 5}}>
      <Text style={{color: 'white', textShadowColor: '#000', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2}}>
        {"100ac (30%)"}
      </Text>
    </View>
  );
});
