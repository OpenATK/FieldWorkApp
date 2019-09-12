import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import {View} from 'react-native'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect(
  {
    onAddField: sequences`TopBar.onAddField`,
    onConnect: sequences`TopBar.onConnect`,
  },
  function MoreDropdown({style, onAddField, onConnect}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }
    function handleClose() {
      setAnchorEl(null);
    }
    return (
      <View style={style}>
        <IconButton edge="end" color="inherit" aria-label="Menu" onClick={handleClick}>
          <MoreIcon  />
        </IconButton>
        <Menu
          style={{top: 50, right: 5}}
          open={Boolean(anchorEl)}
          keepMounted
          anchorEl={anchorEl}
          onClose={handleClose}>
            <MenuItem onClick={()=>{handleClose(); onAddField()}}>Add Field</MenuItem>
            <MenuItem onClick={()=>{handleClose(); onConnect()}}>Connect to OADA</MenuItem>
        </Menu>
      </View>
    );
  }
)
