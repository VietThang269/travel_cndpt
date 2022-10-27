import React, { useRef, useState } from "react";
import "./Home.css";
import { Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Explore from "../../components/Explore/Explore";
import District from "../../components/District/District";
import Place from "../../components/Place/Place";
import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../constant";
import { useContext } from "react";
import { PlaceContext } from "../../contexts/placeContext/PlaceContext";
import { getAllPlace } from "../../contexts/placeContext/apiCalls";

const Home = () => {
  const { places, dispatch } = useContext(PlaceContext);
  const slider = useRef(null);

  useEffect(() => {
    getAllPlace(dispatch);
  }, []);

  places?.splice(4);

  return (
    <div className="home">
      <div className="home_slider">
        <Carousel ref={slider}>
          {places?.map((item) => (
            <div className="home_slider_item">
              <img src={`data:image/png;base64,${item.images[0]}`} alt="" />
              <div className="slider_content">
                <h2>{item.name}</h2>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="prev">
          <LeftOutlined onClick={() => slider.current.prev()} />
        </div>
        <div className="next">
          <RightOutlined onClick={() => slider.current.next()} />
        </div>
      </div>
      <Explore />
      <District />

      <div className="home_place">
        <h2 className="district_title">Các địa điểm nổi tiếng tại Hà Nội</h2>
        <div className="home_place_container">
          {places?.map((item) => (
            <Place item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
