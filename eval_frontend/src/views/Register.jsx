import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";

import config from "../modules/Firebase";
import { Form, Input, Button, Checkbox, Card, Alert } from "antd";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(
    <div style={{ visibility: "hidden" }}></div>
  );

  const loginHandler = () => {
    if (password == passwordConfirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
        })
        .catch((err) => {
          setError(<Alert message={err.message} type="error" />);
        });
    } else
      setError(
        <Alert message="Please enter identical passwords!" type="error" />
      );
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
          name="password1"
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
        <Form.Item
          label="Confirm Password"
          name="password2"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ textAlign: "right" }}
        >
          <Input.Password
            style={{ width: 200 }}
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
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
