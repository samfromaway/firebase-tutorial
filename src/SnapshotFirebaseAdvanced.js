import React, { useState, useEffect, Fragment, useContext } from 'react';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import db from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from './auth/Auth';

function SnapshotFirebaseAdvanced() {
  const colletionRef = collection(db, 'schools');

  const { currentUser } = useContext(AuthContext);

  const currentUserId = currentUser ? currentUser.uid : null;
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [score, setScore] = useState('');

  //ONE TIME GET FUNCTION
  // useEffect(() => {
  //   const getSchools = async () => {
  //     setLoading(true);

  //     const querySnapshot = await getDocs(dbRef);
  //     const items = [];

  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setSchools(items);
  //     setLoading(false);
  //   };

  //   try {
  //     getSchools();
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // eslint-disable-next-line
  // }, []);

  //REALTIME GET FUNCTION
  useEffect(() => {
    const q = query(
      colletionRef,
      //  where('owner', '==', currentUserId),
      where('title', '==', 'School1') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    );

    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setSchools(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  async function addSchool() {
    const owner = currentUser ? currentUser.uid : 'unknown';
    const ownerEmail = currentUser ? currentUser.email : 'unknown';

    const newSchool = {
      title,
      desc,
      score: +score,
      id: uuidv4(),
      owner,
      ownerEmail,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const schoolRef = doc(colletionRef, newSchool.id);
      await setDoc(schoolRef, newSchool);
    } catch (error) {
      console.error(error);
    }
  }

  //DELETE FUNCTION
  async function deleteSchool(school) {
    try {
      const schoolRef = doc(colletionRef, school.id);
      await deleteDoc(schoolRef, schoolRef);
    } catch (error) {
      console.error(error);
    }
  }

  // EDIT FUNCTION
  async function editSchool(school) {
    const updatedSchool = {
      score: +score,
      lastUpdate: serverTimestamp(),
    };

    try {
      const schoolRef = doc(colletionRef, school.id);
      updateDoc(schoolRef, updatedSchool);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <h1>Schools (SNAPSHOT adv.)</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <h6>Title</h6>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h6>Score 0-10</h6>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <h6>Description</h6>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addSchool()}>Submit</button>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {schools.map((school) => (
        <div className="school" key={school.id}>
          <h2>{school.title}</h2>
          <p>{school.desc}</p>
          <p>{school.score}</p>
          <p>{school.ownerEmail}</p>
          <div>
            <button onClick={() => deleteSchool(school)}>X</button>
            <button onClick={() => editSchool(school)}>Edit Score</button>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default SnapshotFirebaseAdvanced;
