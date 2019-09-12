import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {View, Text} from 'react-native';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import _ from 'lodash';

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect(
  {
    open: state`FieldDetails.open`,
    field: state`FieldDetails.field`,
    onStatusChange: sequences`FieldDetails.onStatusChange`
  }, function FieldDetails({open, field, onStatusChange}) {
    if (!Boolean(field)) {
      open = false;
      field = {};
    }
    return (
      <Drawer anchor="bottom" open={open} variant="persistent">
        <View style={{paddingBottom: 20}}>
          <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>{field.name}</Text>
              {/*}<Text style={{marginLeft: 7, fontSize: 20}}>- 40 ac</Text>*/}
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" name="position" row>
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="primary" checked={(field.status == "planned") || false} onChange={()=>{onStatusChange({status: 'planned'})}} />}
                  label="Planned"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="primary" checked={(field.status == "started") || false} onChange={()=>{onStatusChange({status: 'started'})}} />}
                  label="Started"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="bottom"
                  control={<Checkbox color="primary" checked={(field.status == "done") || false} onChange={()=>{onStatusChange({status: 'done'})}} />}
                  label="Done"
                  labelPlacement="bottom"
                />
              </FormGroup>
            </FormControl>
          </View>
        </View>
      </Drawer>
    );
  }
)
