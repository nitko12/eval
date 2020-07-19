import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PageHeader, Button } from "antd";
import "antd/dist/antd.css";
import "./index.css";

import Login from "./views/Login";
import Register from "./views/Register";

import firebase from "./modules/Firebase";
import Homepage from "./views/Homepage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
    }
  });
  return (
    <Router>
      <PageHeader
        className="site-page-header"
        title="CAE"
        subTitle="Coding Assigment Evaluator"
        extra={[
          <Button key="1">Make a CA</Button>,
          <Button key="2">Join a CA</Button>,
          <Link
            to="/dashboard"
            style={{
              display: loggedIn ? "inline" : "none",
            }}
          >
            <Button key="3">My tests</Button>
          </Link>,
          <Link
            to="/login"
            style={{
              display: !loggedIn ? "inline" : "none",
            }}
          >
            <Button key="4" type="primary">
              Login
            </Button>
          </Link>,
          <Link
            to="/register"
            style={{
              display: !loggedIn ? "inline" : "none",
            }}
          >
            <Button key="5" type="primary">
              Register
            </Button>
          </Link>,
          <Button
            key="6"
            type="primary"
            style={{
              display: loggedIn ? "inline" : "none",
            }}
            onClick={() => {
              setLoggedIn(false);
              firebase.auth().signOut().catch(console.error);
            }}
          >
            Log out
          </Button>,
        ]}
      />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}
