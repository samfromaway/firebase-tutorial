import React from 'react';
import { AuthProvider } from './auth/Auth';
import Login from './auth/Login';
import Welcome from './Welcome';
import SnapshotFirebaseAdvanced from './SnapshotFirebaseAdvanced';

function App() {
  return (
    <AuthProvider>
      <Welcome />
      <Login />
      <SnapshotFirebaseAdvanced />
    </AuthProvider>
  );
}

export default App;

//DOCS: https://firebase.google.com/docs/firestore/
