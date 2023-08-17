
import {Routes,Route} from "react-router-dom"
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProtectedRouters from "./ProtectedRouters"

const Routers = () => {
  return (
    <Routes>
    
        
        <Route path="/" element={<ProtectedRouters/>}>
        <Route index element={<Home/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    
    </Routes>
  )
}

export default Routers