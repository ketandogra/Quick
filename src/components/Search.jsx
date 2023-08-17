import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useValue } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useValue();

  const handleSearch = async () => {
    const userRef = collection(db, "users");

    const q = query(userRef, where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check wheter the group(chats in firestore)exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        //create user chats for current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // create user chats for user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="serachForm">
        <span>
          <BiSearch />
        </span>
        <input
          type="text"
          placeholder="Search"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User Not found</span>}
      {user && (
        <div className="searchedUser" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="searchedUserName">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
