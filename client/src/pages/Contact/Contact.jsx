import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact_wrapper">
        <div className="contact_left">
          <p style={{ fontWeight: "bold" }}>Họ và tên</p>
          <Input />
          <p style={{ fontWeight: "bold" }}>Email</p>
          <Input />
          <p style={{ fontWeight: "bold" }}>Lời nhắn</p>
          <TextArea />
          <Button type="primary">Gửi</Button>
        </div>
        <div className="contact_right">
          <p style={{ fontWeight: "bold", fontSize: 25 }}>Liên hệ</p>
          <span>vietthang.nitc@gmail.com</span>
          <p style={{ fontWeight: "bold", fontSize: 25, marginTop: 20 }}>
            Social Media
          </p>
          <div style={{ display: "flex", gap: "1rem", fontSize: 20 }}>
            <FacebookOutlined />
            <InstagramOutlined />
            <TwitterOutlined />
            <YoutubeOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
