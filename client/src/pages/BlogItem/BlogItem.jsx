import axios from "axios";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../../constant";
import parse from "html-react-parser";
import "./BlogItem.css";
const BlogItem = () => {
  const { idBlog } = useParams();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    const getBlogById = async () => {
      const res = await axios.get(`${apiUrl}/getBlogById/${idBlog}`);
      setData(res.data[0]);
    };
    getBlogById();
  }, [idBlog]);

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getAllBlog = async () => {
      const res = await axios(`${apiUrl}/getAllBlog`);
      setBlog(res.data);
    };
    getAllBlog();
  }, [idBlog]);

  useEffect(() => {
    const getUserById = async () => {
      const res = await axios.get(`${apiUrl}/getUser/${data?.idUser}`);
      setUser(res.data[0]);
    };
    getUserById();
  }, []);

  const dataPopular = [...blog];

  dataPopular.splice(3);

  console.log(data);
  return (
    <div className="blogitem_page">
      <div className="blogitem_page_left">
        <img src={`data:image/png;base64,${data?.image[0]}`} alt="" />
        <div className="blogitem_inner">
          <div className="blogitem_page_author">
            <p>Tác giả: {user?.email}</p>
          </div>
          <h3>{data?.title}</h3>
          <div className="blogitem_page_content">
            {data && parse(data?.content)}
          </div>
        </div>
      </div>
      <div className="blogitem_page_right">
        <div className="blog_right">
          <div className="blog_popular">
            <h3>Bài viết phổ biến</h3>
            {dataPopular?.map((item) => (
              <div className="blog_popular_item">
                <div className="blog_popular_item_img">
                  <Link to={`/blog/${item?.id}`}>
                    <img
                      src={`data:image/png;base64,${item?.image[0]}`}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="blog_popular_item_info">
                  <Link to={`/blog/${item?.id}`}>
                    <h3>{item?.title}</h3>
                  </Link>
                  <p>{moment(item?.timestamp).format("DD/MM/YYYY HH:mm A")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
