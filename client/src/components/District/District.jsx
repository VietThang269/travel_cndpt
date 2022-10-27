import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import React, { useRef } from "react";
import "./District.css";

const District = () => {
  const slider = useRef(null);

  return (
    <div className="district">
      <h2 className="district_title">Các quận tại Hà Nội</h2>
      <div className="district_slider">
        <Carousel ref={slider} slidesToShow={6}>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2Fho-hoan-kiem-nam-o-quan-nao-h1.jpg?alt=media&token=fd6bc649-b3e2-4d78-87dd-b54f9e2299b8"
              alt=""
            />
            <h3>Hoàn Kiếm</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2F22_7_5.jpg?alt=media&token=62a1394b-cc39-4218-9212-b0f42e6f506e"
              alt=""
            />
            <h3>Đống Đa</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2Fba-dinh.jpg?alt=media&token=650c8c5e-67fe-43bd-8d54-c1f5603b9937"
              alt=""
            />
            <h3>Ba Đình</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2Fanh-hbt-16145621801881089784408.jpg?alt=media&token=8585de98-9a6e-45ba-b800-f43d010e4760"
              alt=""
            />
            <h3>Hai Bà Trưng</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2Fdji_0006_jims.jpg?alt=media&token=c8529c60-3ff4-47f0-8306-874e496922c7"
              alt=""
            />
            <h3>Hoàng Mai</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2FQua-25-nam-thanh-lap%2C-quan-.jpg?alt=media&token=a7e88488-1f6a-40f8-861f-623d8c031933"
              alt=""
            />
            <h3>Thanh Xuân</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2F01-lgj-12-quân-long-biên-canh-quan-xanh-mat-không-gian-thoang-dang-gia.jpg?alt=media&token=df68eb99-d536-489f-8133-7b9a523197b8"
              alt=""
            />
            <h3>Long Biên</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2Fb6.jpg?alt=media&token=5bd61a4f-af26-4b79-a8da-08eeeb2c9b40"
              alt=""
            />
            <h3>Nam Từ Liêm</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2F4-15904828875821312552020.jpg?alt=media&token=cf0a479f-c95b-4e42-a3a5-35af56adab33"
              alt=""
            />
            <h3>Bắc Từ Liêm</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2Fduong-thanh-nien-ho-tay.jpg?alt=media&token=6bd68a60-25f4-41e8-8714-768b5ed37d07"
              alt=""
            />
            <h3>Tây Hồ</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2F01-lgj-12-quân-long-biên-canh-quan-xanh-mat-không-gian-thoang-dang-gia.jpg?alt=media&token=df68eb99-d536-489f-8133-7b9a523197b8"
              alt=""
            />
            <h3>Cầu Giấy</h3>
          </div>
          <div className="district_item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/netflix-71e26.appspot.com/o/items%2F20220906102952_CV%20TVH%20DN.jpg?alt=media&token=c42be965-4621-4692-a1ea-a4a1adf6d16e"
              alt=""
            />
            <h3>Hà Đông</h3>
          </div>
        </Carousel>
        <LeftOutlined
          onClick={() => slider.current.prev()}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            background: "#f9f9f9",
            borderRadius: "50%",
            position: "absolute",
            top: "40%",
            left: "-5px",
            transform: "translateY(-50%)",
          }}
        />
        <RightOutlined
          onClick={() => slider.current.next()}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            background: "#f9f9f9",
            borderRadius: "50%",
            position: "absolute",
            top: "40%",
            right: "-5px",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
};

export default District;
