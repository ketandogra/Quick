import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { MdOutlinePersonAddAlt } from "react-icons/md";

import { BiSearch } from "react-icons/bi";
import Messages from "./Messages";
import Input from "./Input";
import { useChatValue } from "../context/ChatContext";
import companyLogo from "../assests/Images/quick_logo3.png"
import Img from "./lazyLoadImage";

const Chat = () => {
  const { data } = useChatValue();
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="currentChatUserDetails">
          {data.user.photoURL && <img src={data.user.photoURL} alt="" />}
          <span>{data.user.displayName}</span>
        </div>

        {data.user.photoURL && (
          <div className="chatIcons">
            <span>
              <HiOutlineVideoCamera />
            </span>
            <span>
              <MdOutlinePersonAddAlt />
            </span>
            <span>
              <BiSearch />
            </span>
          </div>
        )}
      </div>

      {data.user.photoURL?
      <><Messages/>
      <Input />
      </>:<div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"-60px"}} >

      

<Img src={companyLogo} style={{objectFit:"cover"}}/>


</div>
}


    </div>
  );
};

export default Chat;
