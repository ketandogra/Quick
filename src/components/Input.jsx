import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { IoMdAttach } from "react-icons/io";

import { useValue } from "../context/AuthContext";
import { useChatValue } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useValue();
  const { data } = useChatValue();


  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on( "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        toast.error("Error while uploading image");
      },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text:"Photo",
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text:"Photo",
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }



    setText("");
    setImg(null);
  };

  const handlePress = (e)=>{

    e.code === "Enter" && e.target.value !=="" && e.target.value.length !== 0 && handleSend()

  }

  return (
    <div className="input">
      <div className="inputMessageWrapper">
        <input
          type="text"
          placeholder="Send a message"
          className="sendMessageInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handlePress}
        />
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])
          }
        />
        <label htmlFor="file">
          <IoMdAttach />
        </label>
        {img && <img className="sendImage" src={URL.createObjectURL(img)}
                alt=""/>}
      </div>

      <div className="send" onClick={handleSend}>
        <VscSend />
      </div>
    </div>
  );
};

export default Input;
