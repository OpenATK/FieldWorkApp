import React from 'react';
import {View, Text} from 'react-native'
import { Button, Modal, Input, Form, Checkbox, Dropdown } from 'semantic-ui-react'

import overmind from '../../overmind'

export default function NewOperation() {
  const {state, actions} = overmind();
  const myState = state.view.Modals.NewOperation;
  const myActions = actions.view.Modals.NewOperation;

  const { open, name, useTemplate, invertTemplate, templateOperation } = myState;
  const { onNameChange, onCancel, onSave, onUseTemplate, onInvertTemplate, onTemplateOperation } = myActions;

  // Seems like a convenient place to get it...
  const templateOptions = Object.values(state.view.TopBar.OperationDropdown.list);

  return (
    <Modal open={open} size='tiny'>
      <Modal.Header>New Operation</Modal.Header>
      <Modal.Content>
        <Text>Name:</Text>
        <View style={{flexDirection: 'row'}}>
          <Form style={{flex: 1}} onSubmit={onSave}>
            <Input autoFocus style={{width: '100%', marginTop: 7}} placeholder='Corn Planting' value={name} onChange={(evt) => {onNameChange({name: evt.target.value})}} />
            <br/>
            <Checkbox label="Plan from another operation" value={useTemplate} onChange={evt => onUseTemplate() } />
            { !useTemplate ? '' : 
              <div>
                <Dropdown placeholder="Select Template Operation" fluid search selection options={templateOptions} onChange={(evt, { value }) => onTemplateOperation({ templateOperation: value })} />
                <Checkbox label="Invert (Plan all unused fields)" value={invertTemplate} onChange={evt => onInvertTemplate() } />
              </div>
            }
          </Form>
        </View>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => onCancel()}>Cancel</Button>
        <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={() => onSave()} />
      </Modal.Actions>
    </Modal>
  );
}
