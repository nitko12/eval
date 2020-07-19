import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Alert } from "antd";

import firebase from "../modules/Firebase";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(
    <div style={{ visibility: "hidden" }}></div>
  );
  const history = useHistory();

  const loginHandler = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(console.error)
      .then(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((user) => {
            history.push("/");
          })
          .catch((err) => {
            setError(<Alert message={err.message} type="error" />);
          });
      });
  };

  return (
    <Card
      title="Card title"
      bordered={true}
      style={{ width: "40%", padding: 30, margin: "auto", marginTop: 40 }}
    >
      <Form>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
          style={{ textAlign: "right" }}
        >
          <Input
            style={{ width: 200 }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Enter Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ textAlign: "right" }}
        >
          <Input.Password
            style={{ width: 200 }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" onClick={loginHandler}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {error}
    </Card>
  );
};
