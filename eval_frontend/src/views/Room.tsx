import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import firebase from "../modules/Firebase";

const db = firebase.firestore();

export default () => {
  const history = useHistory();
  let { id } = useParams();
  db.collection("assigments")
    .where("code", "==", id)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) history.push("/join/1");
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    })
    .catch((err) => {
      console.error(err);
    });
  return <div>{id}</div>;
};
