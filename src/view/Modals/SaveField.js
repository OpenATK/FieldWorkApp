import React from 'react';
import {View} from 'react-native'
import { Button, Modal, Input } from 'semantic-ui-react'

import overmind from '../../overmind'

export default function SaveField() {
  const {state, actions} = overmind();
  const myState = state.view.Modals.SaveField;
  const myActions = actions.view.Modals.SaveField;

  const open = myState.open;
  const name = myState.name;
  const onNameChange = myActions.onNameChange;
  const onCancel = myActions.onCancel;
  const onSave = myActions.onSave;

  return (
    <Modal open={open} size='tiny'>
      <Modal.Header>
        {(state.view.Map.editingField) ? 'Edit Field' : 'New Field'}
      </Modal.Header>
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
