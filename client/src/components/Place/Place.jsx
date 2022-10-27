import { StarFilled } from "@ant-design/icons";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../constant";
import "./Place.css";

const Place = ({ item }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const getCommentByIdPlace = async () => {
      const res = await axios.get(`${apiUrl}/getComment/${item?.id}`);
      setData(res.data);
    };
    getCommentByIdPlace();
  }, []);

  return (
    <div className="place">
      <div className="place_img">
        <Link to={`/travel/${item?.id}`}>
          <img src={`data:image/png;base64,${item?.images[0]}`} alt="" />
        </Link>
      </div>
      <div className="place_rate">
        <StarFilled style={{ color: "#fadb14" }} />
        <StarFilled style={{ color: "#fadb14" }} />
        <StarFilled style={{ color: "#fadb14" }} />
        <StarFilled style={{ color: "#fadb14" }} />
        <StarFilled style={{ color: "#fadb14" }} />
      </div>
      <div className="place_info">
        <Link to={`/travel/${item?.id}`}>
          <h3>{item?.name}</h3>
        </Link>
        <p>{item?.location}</p>
      </div>
      <div className="hr"></div>
      <div className="place_review">
        <div className="place_review_total">{item?.rate} / 5</div>
        <div className="place_review_desc">
          <p>Excellent</p>
          <p>({data?.length} Bình luận)</p>
        </div>
      </div>
    </div>
  );
};

export default Place;
