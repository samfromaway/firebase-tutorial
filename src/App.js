import React from "react";
import GetFirebase from "./GetFirebase";
import SnapshotFirebase from "./SnapshotFirebase";
import { AuthProvider } from "./auth/Auth";
import Login from "./auth/Login";
import Welcome from "./Welcome";

function App() {
  const get = false;
  return (
    <>
      <AuthProvider>
        <Welcome />
        <Login />
        {get ? <GetFirebase /> : <SnapshotFirebase />}
      </AuthProvider>
    </>
  );
}

export default App;

//DOCS: https://firebase.google.com/docs/firestore/
