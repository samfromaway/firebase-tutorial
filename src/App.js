import React, { useState, useEffect } from "react";
import firebase from "./firebase";

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("YOUR_COLLECTIONS_NAME");

  //REALTIME FUNCTION
  // function getSchools() {
  //   setLoading(true);
  //   ref.onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setSchools(items);
  //     setLoading(false);
  //   });
  // }

  // SINGLE GET FUNCTION
  // You might want to add a .catch() method for errors
  function getSchools2() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setSchools(items);
      setLoading(false);
    });
    //.catch((err) => {
    //console.error(err)
    // })
  }

  useEffect(() => {
    // getSchools();
    getSchools2();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Schools</h1>
      {schools.map((school) => (
        <div key={school.id}>
          <h2>{school.title}</h2>
          <p>{school.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
