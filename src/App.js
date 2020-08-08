import React, { useState, useEffect, Fragment } from 'react';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const ref = firebase.firestore().collection('schools');

  //REALTIME GET FUNCTION
  function getSchools() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setSchools(items);
      setLoading(false);
    });
  }

  //SINGLE GET FUNCTION
  function getSchools2() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setSchools(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    // getSchools();
    getSchools2();
    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  function addSchool(newSchool) {
    ref
      //.doc()
      .doc(newSchool.id)
      .set(newSchool)
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteSchool(school) {
    ref
      .doc(school.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editSchool(updatedSchool) {
    setLoading();
    ref
      .doc(updatedSchool.id)
      .update(updatedSchool)
      .catch((err) => {
        console.error(err);
      });
  }

  console.log(schools);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <h1>Schools</h1>
      <div className='inputBox'>
        <h3>Add New</h3>
        <input type='text' onChange={(e) => setTitle(e.target.value)} />
        <textarea onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addSchool({ title, desc, id: uuidv4() })}>
          Submit
        </button>
      </div>
      <hr />
      {schools.map((school) => (
        <div className='school' key={school.id}>
          <h2>{school.title}</h2>
          <p>{school.desc}</p>
          <button onClick={() => deleteSchool(school)}>X</button>
          <button
            onClick={() =>
              editSchool({ title: school.title, desc, id: school.id })
            }
          >
            Edit
          </button>
        </div>
      ))}
    </Fragment>
  );
}

export default App;

//DOCS: https://firebase.google.com/docs/firestore/
