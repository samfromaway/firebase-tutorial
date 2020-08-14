import React, { Fragment } from 'react';
import GetFirebase from './GetFirebase';
import SnapshotFirebase from './SnapshotFirebase';

function App() {
  const get = false;
  return <Fragment>{get ? <GetFirebase /> : <SnapshotFirebase />}</Fragment>;
}

export default App;

//DOCS: https://firebase.google.com/docs/firestore/
