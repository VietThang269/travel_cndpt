import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import JoditEditor from "jodit-react";

import "./CreateBlog.css";
import axios from "axios";
import { apiUrl } from "../../constant";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
const { Dragger } = Upload;

const CreateBlog = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [file, setFile] = useState();
  const [value, setValue] = useState();
  const onFinish = async (values) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      `${apiUrl}/addBlog`,
      {
        idUser: user?.id,
        title: values.title,
        photo: file,
        content: values.content,
      },
      config
    );
    // console.log("Received values of form: ", values);
    if (res) {
      setIsOpen(false);
      form.resetFields();
    }

    console.log(values);
    console.log(file);
  };

  const getFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="createblog">
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: "Vui lòng điền tiêu đề !",
            },
          ]}
        >
          <Input
            style={{ borderRadius: 10 }}
            placeholder="Tiêu đề Blog"
            size="large"
          />
        </Form.Item>
        {/* <Form.Item name="image" getValueFromEvent={getFile}>
          <Upload
            beforeUpload={(file) => {
              return false;
            }}
            multiple={false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Thêm ảnh (1 ảnh)</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item name="image">
          <div>
            <h3>Tải ảnh (1 ảnh)</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        </Form.Item>

        <Form.Item name="content">
          <JoditEditor
            value={value}
            onChange={(newContent) => setValue(newContent)}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            Tạo
          </Button>
          <Button
            type="default"
            htmlType="submit"
            onClick={(e) => {
              setIsOpen(false);
              form.resetFields();
            }}
          >
            Đóng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBlog;
