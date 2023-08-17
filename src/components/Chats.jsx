import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useValue } from "../context/AuthContext";
import { db } from "../firebase";
import { useChatValue } from "../context/ChatContext";
import Img from "./lazyLoadImage";
import { HiOutlinePhotograph } from "react-icons/hi";


const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useValue();
  const {dispatch} = useChatValue();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (user)=>{
    dispatch({type:"CHANGE_USER",payload:user})
    
  }

  // console.log(Object.entries(chats));

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat=>(
      <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <Img
          src={chat[1].userInfo.photoURL}
          alt=""
        />
        <div className="userChatInfo">
          <span style={{wordSpacing:"0px"}}>{chat[1].userInfo.displayName}</span>
          {chat[1].lastMessage?.text == "Photo" && <p style={{display:"flex",alignItems:"center"}}><><HiOutlinePhotograph />{chat[1].lastMessage?.text}</></p>}
          {chat[1].lastMessage?.text !== "Photo" && <p>{chat[1].lastMessage?.text}</p>}

        </div>
      </div>)))}
    </div>
  );
};

export default Chats;
