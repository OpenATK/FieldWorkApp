import React from 'react';
import {View} from 'react-native'
import { Button, Modal, Input } from 'semantic-ui-react'

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect(
  {
    open: state`Modals.SaveField.open`,
    name: state`Modals.SaveField.name`,
    onNameChange: sequences`Modals.SaveField.onNameChange`,
    onCancel: sequences`Modals.SaveField.onCancel`,
    onSave: sequences`Modals.SaveField.onSave`
  },
  function SaveField({ open, name, onNameChange, onCancel, onSave }) {
    return (
      <Modal open={open} size='tiny'>
        <Modal.Header>New Field</Modal.Header>
        <Modal.Content>
          <p>Field Name:</p>
          <Input placeholder='Back 40' value={name} onChange={(evt) => {onNameChange({name: evt.target.value})}} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => onCancel()}>Cancel</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={() => onSave()} />
        </Modal.Actions>
      </Modal>
    );
  }
)
