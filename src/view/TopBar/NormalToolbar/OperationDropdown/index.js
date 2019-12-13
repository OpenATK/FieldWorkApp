import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'
import {View, Text} from 'react-native'

import { state, sequences } from 'cerebral'
import { connect } from '@cerebral/react'

/*const tagOptions = [
  {
    text: 'Important',
    value: 'Important',
    label: { color: 'red', empty: true, circular: true },
  }
]*/

export default connect({
  selectedOperation: state`TopBar.OperationDropdown.selectedOperation`,
  operations: state`TopBar.OperationDropdown.list`,
  open: state`TopBar.OperationDropdown.open`,
  search: state`TopBar.OperationDropdown.search`,
  onAdd: sequences`TopBar.OperationDropdown.onAdd`,
  onChange: sequences`TopBar.OperationDropdown.onChange`,
  onOpenChange: sequences`TopBar.OperationDropdown.onOpenChange`,
  onSearch: sequences`TopBar.OperationDropdown.onSearch`
}, function OperationsDropdown({style, selectedOperation, operations, open, search, onAdd, onChange, onOpenChange, onSearch}) {
  return (
    <View style={style}>
      <View style={{flexDirection: 'row'}}>
        {
          selectedOperation ?
            <Dropdown
              open={open}
              onOpen={() => {onOpenChange({open: true})}}
              onBlur={() => {onOpenChange({open: false})}}
              text={selectedOperation.name}
              icon='filter'
              floating
              labeled
              button
              className='icon'
            >
              <Dropdown.Menu style={{top: 42}}>
                <Dropdown.Item style={{textAlign: 'center'}} text='Add New Operation' value='Add New Operation' onClick={(evt, data)=>{onAdd()}} />
                <Input icon='search' iconPosition='left' className='search' style={{marginTop: 3}} value={search} onChange={(evt)=>{onSearch({search: evt.target.value})}} />
                <Dropdown.Menu scrolling>
                  {operations.map(option => (
                    <Dropdown.Item key={option.value} {...option} onClick={(evt, data)=>{onChange({id: data.value})}} />
                  ))}
                </Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>
          :
            <Dropdown
              onClick={() => {onAdd()}}
              text={'Add New Operation'}
              icon='filter'
              floating
              labeled
              button
              className='icon' />
        }
        <View style={{flex: 1}} />
      </View>
    </View>
  )
})
