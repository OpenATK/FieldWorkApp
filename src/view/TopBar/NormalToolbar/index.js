import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/Menu';

import OperationDropdown from './OperationDropdown';
import MoreDropdown from './MoreDropdown';

export default function NormalToolbar({toggleTitle}) {
  return (
    <Toolbar>
      <IconButton edge="start" style={{marginRight: 7}} color="inherit" aria-label="Menu" onClick={()=>{console.log('TODO Menu Pressed')}}>
        <ListIcon />
      </IconButton>
      <OperationDropdown style={{flex: 1}} />
      <Button color="inherit">2019</Button>
      <MoreDropdown />
    </Toolbar>
  );
}
