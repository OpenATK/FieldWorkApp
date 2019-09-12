import React, {Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {TextInput, View} from 'react-native'


import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect(
  {
    onSaveField: sequences`TopBar.onSaveField`,
    onCancelField: sequences`TopBar.onCancelField`
  }, function DrawingToolbar({onSaveField, onCancelField}) {
    return (
      <Toolbar>
        <View style={{flex: 1}} />
        <Button color="inherit" onClick={() => onCancelField()}>Cancel</Button>
        <Button color="inherit" onClick={() => onSaveField()}>Save</Button>
      </Toolbar>
    );
  }
)
