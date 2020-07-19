import React, { useState } from "react";

import background from "../res/background.jpg";

export default () => {
  return (
    <div
      style={{
        height: "100%",
        textAlign: "center",
        padding: 30,
        fontSize: 20,
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1>Effortless coding assigment grading!</h1>
      <h3>No login required, if you don't want to!</h3>
      <h3>Just click on "Make a CA" or "Join a CA" and try it yourself :)</h3>
      <footer style={{ marginTop: "auto", fontSize: 10 }}>
        <a href="https://www.freevector.com/clouds-and-birds">FreeVector.com</a>
      </footer>
    </div>
  );
};
