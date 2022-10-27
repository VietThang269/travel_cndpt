import axios from "axios";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogItem from "../../components/BlogItem/BlogItem";
import { apiUrl } from "../../constant";
import "./Blog.css";

const Blog = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getAllBlog = async () => {
      const res = await axios(`${apiUrl}/getAllBlog`);
      setBlog(res.data);
    };
    getAllBlog();
  }, []);

  const dataPopular = [...blog];

  dataPopular.splice(3);

  return (
    <div className="blog">
      <div className="blog_left">
        {blog?.map((item) => (
          <BlogItem item={item} />
        ))}
      </div>

      <div className="blog_right">
        <div className="blog_popular">
          <h3>Bài viết phổ biến</h3>
          {dataPopular?.map((item) => (
            <div className="blog_popular_item">
              <div className="blog_popular_item_img">
                <Link to={`/blog/${item?.id}`}>
                  <img src={`data:image/png;base64,${item?.image[0]}`} alt="" />
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
  );
};

export default Blog;
