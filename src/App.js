import React from 'react';
//import GetFirebase from './GetFirebase';
//import SnapshotFirebase from './SnapshotFirebase';
import { AuthProvider } from './auth/Auth';
import Login from './auth/Login';
import Welcome from './Welcome';
import SnapshotFirebaseAdvanced from './SnapshotFirebaseAdvanced';

function App() {
  //const get = false;

  return (
    <>
      <AuthProvider>
        <Welcome />
        <Login />
        {/* {get ? <GetFirebase /> : <SnapshotFirebase />} */}
        <SnapshotFirebaseAdvanced />
      </AuthProvider>
    </>
  );
}

export default App;

//DOCS: https://firebase.google.com/docs/firestore/
