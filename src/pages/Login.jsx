import React,{useState} from 'react'
import quick_logo from '../assests/Images/Quick_logo.png'
import { Link,useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";



const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async(e)=>{
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value


    try{
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      toast.success("Successfully logged in");
      navigate("/");

    }catch(error){
      toast.error("Invalid email or password");
    }
  }
  return (
    <div className='formContainer'>
    <div className="formWrapper">
        <span className="logo"><img src={quick_logo} alt=''/></span>
        <span className="title">Login</span>
        <form  onSubmit={submitHandler}>
            <input type="email" placeholder='Email' />
            <div className="password_field">
            <input
              type={showPassword?"text":"password"}
              className="password"
              placeholder="Password"
            />
            <span className="pass_show"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </span>
          </div>

            <button type='submit'>LOG IN</button>
        </form>
        <p>Don't have an account? <Link to='/register'><span>Register</span></Link></p>

    </div>
</div>
  )
}

export default Login