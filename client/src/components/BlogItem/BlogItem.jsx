import React from "react";
import "./BlogItem.css";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../constant";
import { useState } from "react";
import moment from "moment";

const BlogItem = ({ item }) => {
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`${apiUrl}/getUser/${item?.idUser}`);
      setDataUser(res.data[0]);
    };
    getUser();
  }, []);

  const date = moment(item?.timestamp).format("DD/MM/YYYY  - HH:mm A");

  return (
    <div className="blog_item">
      <div className="blog_item_img">
        <Link to={`/blog/${item?.id}`}>
          <img src={`data:image/png;base64,${item?.image[0]}`} alt="" />
        </Link>
      </div>
      <div className="blog_item_tag"></div>
      <div className="blog_item_info">
        <Link to={`/blog/${item?.id}`}>
          <h3>{item?.title}</h3>
        </Link>
      </div>
      <div className="blog_item_user">
        {/* <div className="blog_item_user_img">
          <img src="" alt="" />
        </div> */}
        <div className="blog_item_user_name">
          Được viết bởi: {dataUser?.email}
        </div>
        <div className="blog_item_user_time">Thời gian đăng: {date}</div>
      </div>
    </div>
  );
};

export default BlogItem;
