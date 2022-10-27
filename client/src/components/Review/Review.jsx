import React, { useState } from "react";
import { Avatar, Button, Comment, Form, Input, List, Rate } from "antd";
import "./Review.css";
import axios from "axios";
import { apiUrl } from "../../constant";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { useEffect } from "react";
import { StarFilled } from "@ant-design/icons";
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} nhận xét`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value, rate, setRate }) => (
  <>
    <Form.Item>
      <span>Đánh giá sao: </span>
      <Rate onChange={setRate} value={rate} />
    </Form.Item>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Thêm nhận xét
      </Button>
    </Form.Item>
  </>
);
const Review = ({ id, data }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [rate, setRate] = useState();

  useEffect(() => {
    const getCommentByIdPlace = async () => {
      const res = await axios.get(`${apiUrl}/getComment/${id}`);
      setComments(res.data);

      const test = res.data.map(async (item) => {
        const res = await axios.get(`${apiUrl}/getUser/${item.idUser}`);
        return {
          author: `${res.data[0]?.email}`,
          avatar: (
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                width: "35px",
                height: "35px",
              }}
            >
              {res.data[0]?.email}
            </Avatar>
          ),
          content: (
            <>
              <div>
                {item.rateStar == 1 && (
                  <>
                    <StarFilled style={{ color: "#fadb14" }} />
                  </>
                )}{" "}
                {item.rateStar == 2 && (
                  <>
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                  </>
                )}{" "}
                {item.rateStar == 3 && (
                  <>
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                  </>
                )}{" "}
                {item.rateStar == 4 && (
                  <>
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                  </>
                )}
                {item.rateStar == 5 && (
                  <>
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                    <StarFilled style={{ color: "#fadb14" }} />
                  </>
                )}
              </div>
              <p>{item.commentDetail}</p>,
            </>
          ),
          // datetime: `${time}`,
        };
      });
      Promise.all(test).then((response) => setComments(response));
    };
    getCommentByIdPlace();
  }, [loading]);

  const handleSubmit = async () => {
    const res = await axios.post(`${apiUrl}/addComment`, {
      idUser: user?.id,
      idPlace: id,
      rateStar: rate || 1,
      commentDetail: value,
    });
    const res1 = await axios.put(`${apiUrl}/updateTest`, {
      rateComment: rate || 1,
      rateStar: data?.rate,
      idPlace: id,
    });

    if (res && res1) {
      setValue("");
      setRate(0);
      setLoading(!loading);
    }
    // if (!value) return;
    // setSubmitting(true);
    // setSubmitting(false);
    // setValue("");
    // setComments([
    //   ...comments,
    //   {
    //     author: "Han Solo",
    //     avatar: "https://joeschmoe.io/api/v1/random",
    //     content: <p>{value}</p>,
    //     // datetime: moment("2016-11-22").fromNow(),
    //   },
    // ]);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="review">
      <>
        {comments.length > 0 && <CommentList comments={comments} />}

        {user && (
          <Comment
            avatar={
              <Avatar
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  width: "35px",
                  height: "35px",
                }}
              >
                {user?.email}
              </Avatar>
            }
            content={
              <Editor
                rate={rate}
                setRate={setRate}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        )}
      </>
    </div>
  );
};

export default Review;
