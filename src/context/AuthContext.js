import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const useValue = ()=>{
    const value = useContext(AuthContext)
    return value
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        if(user){
            
            setCurrentUser(user)
        }
        else{
            setCurrentUser(null)
        }
    });

    return ()=>{
        unsub()
    }


  }, []);
  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
