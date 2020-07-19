import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PageHeader, Button } from "antd";
import "antd/dist/antd.css";
import "./index.css";

import Login from "./views/Login";
import Register from "./views/Register";

import firebase from "./modules/Firebase";
import Homepage from "./views/Homepage";
import JoinCA from "./views/JoinCA";
import MakeCA from "./views/MakeCA";
import Room from "./views/Room";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {};

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
    }
  });

  return (
    <Router>
      <PageHeader
        className="site-page-header"
        title={<Link to="/">CAE</Link>}
        subTitle="Coding Assigment Evaluator"
        extra={[
          <Link to="/make">
            <Button key="1">Make a CA</Button>
          </Link>,
          <Link to="/join/0">
            <Button key="2">Join a CA</Button>
          </Link>,
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
          <Link to="/">
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
            </Button>
          </Link>,
        ]}
      />
      <Switch>
        <Route path="/room/:id">
          <Room />
        </Route>
        <Route path="/join/:error">
          <JoinCA />
        </Route>
        <Route path="/make">
          <MakeCA />
        </Route>
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
