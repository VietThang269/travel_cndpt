import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";
import { Button, Carousel, Radio, Select } from "antd";
import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import Place from "../../components/Place/Place";
import { getAllPlace } from "../../contexts/placeContext/apiCalls";
import { PlaceContext } from "../../contexts/placeContext/PlaceContext";
import "./Travel.css";

const { Option } = Select;

const Travel = () => {
  const { places, dispatch } = useContext(PlaceContext);
  const [data, setData] = useState();
  const [sort, setSort] = useState("all");
  const slider = useRef(null);
  const [value, setValue] = useState(5);
  let dataSlider;
  if (places) dataSlider = [...places];
  dataSlider?.splice(4);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleReset = () => {
    setData(places);
  };

  useEffect(() => {
    getAllPlace(dispatch);
  }, []);

  useEffect(() => {
    setData(places);
  }, [places]);

  useEffect(() => {
    switch (sort) {
      case "all":
        if (places) {
          const dataAll = [...places];
          const dataFilterAll = dataAll.filter((item) => item.rate == value);
          setData(dataFilterAll);
        }
        break;
      case "ass":
        const dataAss = [...places];
        const dataFilterAss = dataAss.filter((item) => item.rate == value);
        dataFilterAss.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setData(dataFilterAss);
        break;
      case "des":
        const dataDes = [...places];
        const dataFilterDes = dataDes.filter((item) => item.rate == value);
        dataFilterDes.sort(function (a, b) {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
        setData(dataFilterDes);
        break;
      default:
        break;
    }
  }, [sort, value]);
  return (
    <div className="travel">
      <div className="home_slider">
        <Carousel ref={slider}>
          {dataSlider?.map((item) => (
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
      <div className="travel_container">
        <div className="travel_left">
          <div className="travel_fiter_star">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3>Lọc theo lượt đánh giá</h3>
              <h5
                style={{
                  color: "var(--main-color)",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={handleReset}
              >
                Xem tất cả
              </h5>
            </div>
            <Radio.Group
              onChange={onChange}
              value={value}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingLeft: "20px",
              }}
            >
              <Radio value={5}>
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
              </Radio>
              <Radio value={4}>
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
              </Radio>
              <Radio value={3}>
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
              </Radio>
              <Radio value={2}>
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
              </Radio>
              <Radio value={1}>
                <StarFilled style={{ color: "#fadb14", marginRight: 5 }} />
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="travel_right">
          <div className="travel_right_option">
            <div className="travel_right_option_total">
              Có tất cả{" "}
              <span style={{ fontWeight: "bold" }}>{data?.length}</span> kết quả
            </div>
            <div className="travel_right_option_sort">
              <Select
                defaultValue="all"
                style={{ width: "100%" }}
                onChange={(value) => setSort(value)}
              >
                <Option value="all">Tất cả</Option>
                <Option value="ass">Theo bảng chữ cái (a-z)</Option>
                <Option value="des">Theo bảng chữ cái (z-a)</Option>
              </Select>
            </div>
          </div>
          <div className="travel_right_container">
            {data?.map((item) => (
              <Place item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;
