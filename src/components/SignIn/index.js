import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";
import { useWebinarStore } from "../../store";
import "./index.css";
import { useHistory } from "react-router";

const SignIn = () => {
  let history = useHistory();
  const [isSignup, setsignup] = useState(false);
  const [{}, { onLogin }] = useWebinarStore();
  const onFinish = (values) => {
    onLogin(values, history);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login_wrap">
      {" "}
      <div className="login">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
           {isSignup && (
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="Email"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
         
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {isSignup ? (
                <Button type="primary" htmlType="submit">
                  SignUp
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  SignIn
                </Button>
              )}
            </Form.Item>
            {!isSignup&&
            <p
              style={{ cursor: "pointer", fontSize: "10px" }}
              onClick={() => setsignup(true)}
            >
              If you are a new user please click here to continue
            </p>}
          </span>
           
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
