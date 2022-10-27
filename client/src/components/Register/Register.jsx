import { Button, Form, Input, message, Modal } from "antd";
import React, { useContext } from "react";
import { login, register } from "../../contexts/authContext/apiCalls";
import { AuthContext } from "../../contexts/authContext/AuthContext";

const Register = ({ res, setRes }) => {
  const { user, dispatch, error } = useContext(AuthContext);
  const [form] = Form.useForm();
  const onRes = (values) => {
    console.log(values);
    register(values, dispatch);
  };

  if (error) {
    message.error("Email đã tồn tại");
  }
  return (
    <div>
      <>
        <h3 style={{ marginBottom: 20 }}>Đăng ký</h3>
        <Form onFinish={onRes}>
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
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Xác nhận mật khẩu chưa trùng khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              style={{ borderRadius: 10 }}
              placeholder="Xác nhận mật khẩu"
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
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <p>
          Bạn đã có tài khoản?{" "}
          <a onClick={(e) => setRes(false)}>Đăng nhập ngay</a>
        </p>
      </>
    </div>
  );
};

export default Register;
