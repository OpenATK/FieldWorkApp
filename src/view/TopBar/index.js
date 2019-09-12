import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import {View} from 'react-native'

import DrawingToolbar from './DrawingToolbar';
import NormalToolbar from './NormalToolbar';

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect(
  {
    drawing: state`Map.BoundaryDrawing.drawing`,
  },
  function TopBar({drawing}) {
    return (
      <View style={{zIndex: 1201}}>
        <AppBar position="static">
          {
            drawing ? <DrawingToolbar /> : <NormalToolbar />
          }
        </AppBar>
      </View>
    );
  }
)
