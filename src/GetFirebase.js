import React, { useState, useEffect, Fragment } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";

function GetFirebase() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const ref = firebase.firestore().collection("schools");

  //ONE TIME GET FUNCTION
  function getSchools2() {
    setLoading(true);
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setSchools(items);
      setLoading(false);
    });
  }
  useEffect(() => {
    getSchools2();
    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  function addSchool(newSchool) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newSchool.id)
      .set(newSchool)
      .then(() => {
        setSchools((prev) => [newSchool, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteSchool(school) {
    ref
      .doc(school.id)
      .delete()
      .then(() => {
        setSchools((prev) =>
          prev.filter((element) => element.id !== school.id)
        );
      })
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
      .then(() => {
        setSchools((prev) =>
          prev.map((element) => {
            if (element.id !== updatedSchool.id) {
              return element;
            }
            return updatedSchool;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Fragment>
      <h1>Schools (GET)</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={() => addSchool({ title, desc, id: uuidv4() })}>
          Submit
        </button>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {schools.map((school) => (
        <div className="school" key={school.id}>
          <h2>{school.title}</h2>
          <p>{school.desc}</p>
          <div>
            <button onClick={() => deleteSchool(school)}>X</button>
            <button
              onClick={() =>
                editSchool({ title: school.title, desc, id: school.id })
              }
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

export default GetFirebase;

//DOCS: https://firebase.google.com/docs/firestore/
