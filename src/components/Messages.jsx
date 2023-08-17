import Message from "./Message";
import React, { useEffect, useState } from "react";
import { useChatValue } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState();
  const { data } = useChatValue();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });


  }, [data.chatId]);
  return (
    <div className="messages">
      {messages?.map((message) => (
        <Message message={message} key={message.id}/>
      ))}
    </div>
  );
};

export default Messages;
