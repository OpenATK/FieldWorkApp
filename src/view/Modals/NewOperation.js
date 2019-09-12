import React from 'react';
import {View, Text} from 'react-native'
import { Button, Modal, Input } from 'semantic-ui-react'

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect(
  {
    open: state`Modals.NewOperation.open`,
    name: state`Modals.NewOperation.name`,
    onNameChange: sequences`Modals.NewOperation.onNameChange`,
    onCancel: sequences`Modals.NewOperation.onCancel`,
    onSave: sequences`Modals.NewOperation.onSave`
  },
  function NewOperation({ open, name, onNameChange, onCancel, onSave }) {
    return (
      <Modal open={open} size='tiny'>
        <Modal.Header>New Operation</Modal.Header>
        <Modal.Content>
          <Text>Name:</Text>
          <View style={{flexDirection: 'row'}}>
            <Input style={{flex: 1, marginTop: 7}} placeholder='Corn Planting' value={name} onChange={(evt) => {onNameChange({name: evt.target.value})}} />
          </View>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => onCancel()}>Cancel</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={() => onSave()} />
        </Modal.Actions>
      </Modal>
    );
  }
)
