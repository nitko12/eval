import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Alert } from "antd";

export default () => {
  const [code, setCode] = useState("");
  const history = useHistory();
  let { error } = useParams();
  const joinHandler = () => {
    if (code.length == 9) history.push(`/room/${code}`);
  };

  return (
    <Card
      title="Paste the assigment code"
      bordered={true}
      style={{
        width: "40%",
        padding: 30,
        margin: "auto",
        marginTop: 40,
        textAlign: "center",
      }}
    >
      <Form>
        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, message: "Please input the code!" }]}
          style={{ textAlign: "right" }}
        >
          <Input
            style={{ width: 200 }}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
        </Form.Item>
        <p>The code should look like: 314159265</p>
        <p></p>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" onClick={joinHandler}>
            Submit
          </Button>
        </Form.Item>
        <Alert
          style={{ display: error == "1" ? "inline" : "none" }}
          message="Error happened while joining room!"
          type="error"
        />
      </Form>
    </Card>
  );
};
