import React, { useEffect, useRef, useState } from "react";
import { useValue } from "../context/AuthContext";
import { useChatValue } from "../context/ChatContext";
import Img from "./lazyLoadImage";
import dayjs from "dayjs";

const Message = ({ message }) => {
  console.log(
    message.date.toDate().getHours(),
    message.date.toDate().getMonth()
  );

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const { currentUser } = useValue();
  const { data } = useChatValue();
  const ref = useRef();

  useState(() => {
    setHours(message.date.toDate().getHours());
    setMinutes(message.date.toDate().getMinutes());
    setSeconds(message.date.toDate().getSeconds());
  }, [message]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"} `}
    >
      <div className="messageInfo">
        <Img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span style={{ fontSize: "12px" }}>
          {dayjs(message.date.toDate()).format("MMM D, YYYY")}
        </span>
      </div>

      <div className="messageContent">
        {message.text && (
          <div>
            <span
              style={{ fontSize: "10px", color: "gray" }}
            >{`${hours}:${minutes}:${seconds}`}</span>
            <p>{message.text}</p>
          </div>
        )}

        {message.img && (
          <div className="imgMessage">
            <span className="time_text"
              style={{ fontSize: "10px", color: "gray" }}
            >{`${hours}:${minutes}:${seconds}`}</span>
            <Img src={message.img} alt="" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
