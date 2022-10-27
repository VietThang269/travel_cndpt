import {
  FieldTimeOutlined,
  InsertRowAboveOutlined,
  MoneyCollectOutlined,
  StarFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../../constant";
import { getAllPlace } from "../../contexts/placeContext/apiCalls";
import { PlaceContext } from "../../contexts/placeContext/PlaceContext";
import "./TravelItem.css";
import parse from "html-react-parser";
import Review from "../../components/Review/Review";

const TravelItem = () => {
  const { id } = useParams();
  const { places, dispatch } = useContext(PlaceContext);
  const [item, setItem] = useState();
  const [data, setData] = useState();
  const [commnent, setCommnent] = useState();
  useEffect(() => {
    const getPlaceById = async () => {
      const res = await axios.get(`${apiUrl}/getPlaceById/${id}`);
      setData(res.data[0]);
    };
    getPlaceById();
  }, []);
  useEffect(() => {
    const getCommentById = async () => {
      const res = await axios.get(`${apiUrl}/getComment/${id}`);
      setCommnent(res.data);
    };
    getCommentById();
  }, []);

  return (
    <div className="travel_item">
      <div className="travel_item_img">
        <div className="div1">
          <img src={`data:image/png;base64,${data?.images[0]}`} alt="" />
        </div>
        <div className="div2">
          <img src={`data:image/png;base64,${data?.images[1]}`} alt="" />
        </div>
        <div className="div3">
          <img src={`data:image/png;base64,${data?.images[2]}`} alt="" />
        </div>
        <div className="div4">
          <img src={`data:image/png;base64,${data?.images[3]}`} alt="" />
        </div>
        <div className="div5">
          <img src={`data:image/png;base64,${data?.images[4]}`} alt="" />
        </div>
      </div>
      <div className="travel_item_info">
        <div className="place_rate">
          <StarFilled style={{ color: "#fadb14" }} />
          <StarFilled style={{ color: "#fadb14" }} />
          <StarFilled style={{ color: "#fadb14" }} />
          <StarFilled style={{ color: "#fadb14" }} />
          <StarFilled style={{ color: "#fadb14" }} />
        </div>
        <div className="place_info">
          <Link to={`/travel/id`}>
            <h3>{data?.name}</h3>
          </Link>
          <p>{data?.location}</p>
        </div>
        <div className="hr"></div>
        <div className="place_review">
          <div className="place_review_total">{data?.rate} / 5</div>
          <div className="place_review_desc">
            <p>Excellent</p>
            <p>({commnent?.length} Bình luận)</p>
          </div>
        </div>
      </div>
      <div className="travel_item_about">
        <h3>
          <InsertRowAboveOutlined style={{ marginRight: 10 }} />
          Về địa điểm
        </h3>
        <p>{data && parse(data?.about)}</p>
      </div>
      <div className="hr"></div>
      <div className="travel_item_target">
        <h3>
          <UsergroupAddOutlined style={{ marginRight: 10 }} />
          Đối tượng phù hợp
        </h3>
        <p>{data?.target}</p>
      </div>
      <div className="hr"></div>
      <div className="travel_item_time">
        <h3>
          <FieldTimeOutlined style={{ marginRight: 10 }} />
          Thời gian đón tiếp
        </h3>
        <p style={{ marginBottom: 10, fontWeight: 500 }}>
          Mở cửa: <span style={{ fontWeight: 400 }}>{data?.timeStart}</span>
        </p>
        <p style={{ marginBottom: 10, fontWeight: 500 }}>
          Đóng cửa: <span style={{ fontWeight: 400 }}>{data?.timeEnd}</span>
        </p>
      </div>
      <div className="hr"></div>
      <div className="travel_item_price">
        <h3>
          <MoneyCollectOutlined style={{ marginRight: 10 }} />
          Giá vé
        </h3>
        <p>{data?.price}</p>
      </div>
      <div className="hr"></div>
      <div className="travel_item_review">
        <h3>Review</h3>
        <Review id={id} data={data} />
      </div>
    </div>
  );
};

export default TravelItem;
