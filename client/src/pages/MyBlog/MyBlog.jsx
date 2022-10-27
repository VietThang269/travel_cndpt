import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { apiUrl } from "../../constant";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import "./MyBlog.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button, Modal, Input, Form } from "antd";
import JoditEditor from "jodit-react";

const MyBlog = () => {
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [idBlog, setIdBlog] = useState();
  const [value, setValue] = useState();
  const [title, setTitle] = useState();
  const [file, setFile] = useState();
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBlogByIdUser = async () => {
      const res = await axios.get(`${apiUrl}/getBlogByIdUser/${user?.id}`);
      setData(res.data);
    };
    getBlogByIdUser();
  }, [loading]);

  const hanldeSetId = (value) => {
    setIdBlog(value);
  };

  useEffect(() => {
    const getBlogById = async () => {
      const res = await axios.get(`${apiUrl}/getBlogById/${idBlog}`);
      setBlog(res.data[0]);
      setValue(res.data[0].content);
      setTitle(res.data[0].title);
    };
    getBlogById();
  }, [idBlog]);

  const hanldeUpdateBlog = async (e) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.put(
      `${apiUrl}/updateBlog`,
      {
        id: idBlog,
        photo: file,
        title: title,
        content: value,
      },
      config
    );

    if (res) {
      setOpen(false);
      setLoading(!loading);
    }
  };

  const hanldeDeleteBlog = async (values) => {
    const res = await axios.delete(`${apiUrl}/deleteBlog/${values}`);
    if (res) setLoading(!loading);
  };

  return (
    <div className="myblog">
      <p>Các bài Blog của tôi</p>
      <div className="myblog_container">
        {data?.map((item) => (
          <div className="myblog_item">
            <img src={`data:image/png;base64,${item?.image[0]}`} alt="" />
            <div className="myblog_item_content">
              <p>Viết bởi: {user?.email}</p>
              <p>
                Đăng vào: {moment(item?.timestamp).format("DD/MM/YYYY HH:mm A")}
              </p>
              <Link to={`/blog/${item?.id}`}>
                <h2>{item?.title}</h2>
              </Link>
            </div>
            <div className="myblog_item_option">
              <Button
                type="primary"
                onClick={(e) => {
                  setOpen(true);
                  hanldeSetId(item?.id);
                }}
              >
                Chỉnh sửa
              </Button>
              <Button
                type="danger"
                onClick={(e) => {
                  hanldeDeleteBlog(item?.id);
                }}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Chỉnh sửa"
        open={open}
        onOk={hanldeUpdateBlog}
        onCancel={(e) => setOpen(false)}
        width={1200}
        // footer={null}
      >
        {/* <Form form={form} onFinish={onFinish}> */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: 20 }}>
          <h3 style={{ width: "6%" }}>Tiêu đề:</h3>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        {/* <Form.Item name="image"> */}
        <div style={{ margin: "20px 0" }}>
          <h3>Tải ảnh (1 ảnh)</h3>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        {/* </Form.Item> */}
        <JoditEditor
          value={value}
          onChange={(newContent) => setValue(newContent)}
        />
        {/* <Form.Item> */}
        {/* <Button type="primary" htmlType="submit"> */}
        {/* Update */}
        {/* </Button> */}
        {/* </Form.Item> */}
        {/* </Form> */}
      </Modal>
    </div>
  );
};

export default MyBlog;
