import { Button, Form, Input, message, Modal } from "antd";
import React, { useContext } from "react";
import { login } from "../../contexts/authContext/apiCalls";
import { AuthContext } from "../../contexts/authContext/AuthContext";

const Login = ({ res, setRes }) => {
  const { user, dispatch, error } = useContext(AuthContext);
  const [form] = Form.useForm();
  const onLogin = (values) => {
    login(values, dispatch);
  };

  if (error) {
    message.error("Sai tài khoản hoặc mật khẩu");
  }
  return (
    <div>
      <>
        <h3 style={{ marginBottom: 20 }}>Đăng nhập</h3>
        <Form form={form} onFinish={onLogin}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "Vui lòng điền email !",
              },
            ]}
          >
            <Input
              style={{ borderRadius: 10 }}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                type: "password",
                message: "Vui lòng điền mật khẩu !",
              },
            ]}
          >
            <Input.Password
              style={{ borderRadius: 10 }}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "100%", borderRadius: 50 }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <p>
          Bạn chưa có tài khoản?{" "}
          <a onClick={(e) => setRes(true)}>Đăng ký ngay</a>
        </p>
      </>
    </div>
  );
};

export default Login;
