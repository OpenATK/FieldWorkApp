import React from 'react';
import logo from './logo.svg';
import './App.css';

import Map from './Map'
import TopBar from './TopBar'
import FieldList from './FieldList'
import FieldDetails from './FieldDetails'
import AcresStatus from './AcresStatus'

import ModalSaveField from './Modals/SaveField';
import ModalOADADomain from './Modals/OADADomain';
import ModalNewOperation from './Modals/NewOperation';

function App() {
  return (
    <div className="App">
      <TopBar />
      <AcresStatus />
      <Map />
      <FieldList />
      <FieldDetails />
      <ModalSaveField />
      <ModalOADADomain />
      <ModalNewOperation />
    </div>
  );
}

export default App;
