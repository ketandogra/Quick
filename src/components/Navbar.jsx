import React from 'react'
import logo from"../assests/Images/Quick_logo2.png"
import {useValue} from "../context/AuthContext"
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signOut } from 'firebase/auth'
import Img from './lazyLoadImage'


const Navbar = () => {
  const {currentUser} = useValue()
  const navigate = useNavigate()

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.info("Logged out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
      navigate('/login')
  };
  return (
    <div className='navbar'>
      <span className='logo'><img src={logo} alt=""></img></span>
      <div className="user">
        <Img src={currentUser.photoURL} alt=""/>
        <span>{currentUser.displayName}</span>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar