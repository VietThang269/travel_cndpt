import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

const Explore = () => {
  return (
    <div className="explore">
      <div className="explore_left">
        <div className="explore_left_title">
          <h2>Cùng nhau khám phá </h2>
          <p>những địa điểm du lịch nổi tiếng tại Hà Nội</p>
          <Link to={`/travel`}>
            <Button
              size="large"
              style={{
                color: "#35368F",
                backgroundColor: "#FFDF7A",
                fontWeight: "600",
                borderColor: "#FFDF7A",
              }}
            >
              Khám phá ngay
            </Button>
          </Link>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2F6928549-01.png?alt=media&token=c7c17b68-21f2-497d-8f08-032fae32cc88"
          alt=""
        />
      </div>
      <div className="explore_right">
        <div className="explore_title">
          <h2>Cuối tuần rảnh rỗi </h2>
          <p>tới ngay những địa điểm du lịch sau</p>
          <Link to={`/travel`}>
            <Button
              size="large"
              style={{
                backgroundColor: "#35368F",
                color: "#FFDF7A",
                fontWeight: "600",
                borderColor: "#35368F",
              }}
            >
              Truy cập
            </Button>
          </Link>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2F148377-OUCWYU-294-01.png?alt=media&token=27ffd490-caa1-4e58-bd2b-bfb5b857ccc3"
          alt=""
        />
      </div>
    </div>
  );
};

export default Explore;
