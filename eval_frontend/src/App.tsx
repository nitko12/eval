import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { PageHeader, Button } from "antd";
import "antd/dist/antd.css";
import "./index.css";

import config from "./modules/Firebase";
import Login from "./views/Login";
import Register from "./views/Register";

import firebase from "./modules/Firebase";

export default function App() {
  console.log(firebase.auth().currentUser);
  return (
    <Router>
      <PageHeader
        className="site-page-header"
        title="CAE"
        subTitle="Coding Essigment Evaluator"
        extra={[
          <Button key="3">Make a CA</Button>,
          <Button key="2">Join a CA</Button>,
          <Link
            to="/login"
            style={{
              display: !firebase.auth().currentUser ? "inline" : "none",
            }}
          >
            <Button key="1" type="primary">
              Login
            </Button>
          </Link>,
          <Link
            to="/register"
            style={{
              display: !firebase.auth().currentUser ? "inline" : "none",
            }}
          >
            <Button key="1" type="primary">
              Register
            </Button>
          </Link>,
        ]}
      />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Users />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  const user = firebase.auth().currentUser;
  if (user) return <h2>{user.email}</h2>;
  return <h2>a</h2>;
}
