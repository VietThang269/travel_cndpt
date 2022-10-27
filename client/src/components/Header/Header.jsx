import React, { useState } from "react";
import "./Header.css";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Form, Input, message, Modal, Popover } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { login, logOut, register } from "../../contexts/authContext/apiCalls";
import Login from "../Login/Login";
import Register from "../Register/Register";
import CreateBlog from "../CreateBlog/CreateBlog";

const Header = () => {
  const { user, dispatch, error } = useContext(AuthContext);
  // const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [res, setRes] = useState(false);

  const logout = () => {
    logOut(dispatch);
  };

  const openModalAddBlog = () => {
    setIsOpen1(true);
  };

  return (
    <header className="header">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2Fimage%201.png?alt=media&token=33cdcbd3-99e9-46c2-857f-aaab8f81fe97"
        alt=""
        className="header_logo"
      />
      <ul className="header_list">
        <Link to={`/`}>
          <li className="header_item">Trang chủ</li>
        </Link>
        <Link to={`/travel`}>
          <li className="header_item">
            Địa điểm Du lịch <CaretDownOutlined />
          </li>
        </Link>
        <Link to={`/blog`}>
          <li className="header_item">Bài Review</li>
        </Link>
        <Link to={`/contact`}>
          <li className="header_item">Liên hệ</li>
        </Link>
      </ul>
      {!user && (
        <div className="header_account">
          <UserOutlined onClick={(e) => setIsOpen(true)} />
          <Modal
            open={isOpen}
            footer={null}
            style={{ borderRadius: 20 }}
            onCancel={(e) => setIsOpen(false)}
            className="modal_radius"
          >
            {!res && <Login res={res} setRes={setRes} />}

            {res && <Register res={res} setRes={setRes} />}
          </Modal>
        </div>
      )}
      {user && (
        <div className="header_account">
          <Popover
            style={{ zIndex: 1 }}
            content={
              <div className="header_option">
                <Button type="primary" onClick={openModalAddBlog}>
                  Tạo Blog mới +
                </Button>
                <Link to={`/myblog`}>
                  <Button type="primary">Các Blog của tôi</Button>
                </Link>

                <Button type="default" onClick={logout}>
                  Logout
                </Button>
              </div>
            }
            title="Thiết lập"
            trigger="click"
            placement="bottom"
          >
            <UserOutlined onClick={(e) => setIsOpen(true)} />
          </Popover>
        </div>
      )}
      <Modal
        width={1200}
        open={isOpen1}
        title="Tạo Blog"
        footer={null}
        onCancel={(e) => setIsOpen1(false)}
      >
        <CreateBlog isOpen={isOpen1} setIsOpen={setIsOpen1} />
      </Modal>
    </header>
  );
};

export default Header;
