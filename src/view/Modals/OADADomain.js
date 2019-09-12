import React from 'react';
import {View, Text} from 'react-native'
import { Button, Modal, Input } from 'semantic-ui-react'

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

export default connect(
  {
    open: state`Modals.OADADomain.open`,
    domain: state`Modals.OADADomain.domain`,
    onDomainChange: sequences`Modals.OADADomain.onDomainChange`,
    onCancel: sequences`Modals.OADADomain.onCancel`,
    onConnect: sequences`Modals.OADADomain.onConnect`
  },
  function OADADomain({ open, domain, onDomainChange, onCancel, onConnect }) {
    return (
      <Modal open={open} size='tiny'>
        <Modal.Header>Connect to OADA Server</Modal.Header>
        <Modal.Content>
          <Text>Domain:</Text>
          <View style={{flexDirection: 'row'}}>
            <Input style={{flex: 1, marginTop: 7}} placeholder='https://oada.openatk.com' value={domain} onChange={(evt) => {onDomainChange({domain: evt.target.value})}} />
          </View>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => onCancel()}>Cancel</Button>
          <Button positive icon='checkmark' labelPosition='right' content='Connect' onClick={() => onConnect()} />
        </Modal.Actions>
      </Modal>
    );
  }
)
