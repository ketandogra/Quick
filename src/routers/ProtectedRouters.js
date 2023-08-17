import React from 'react'
import { useValue } from '../context/AuthContext'
import {Navigate} from "react-router-dom"
import { Outlet } from 'react-router-dom'

const ProtectedRouters = () => {


    const {currentUser} = useValue()
  
    return currentUser?<Outlet/> :<Navigate to="/login"/>
  
}

export default ProtectedRouters