import quick_logo from "../assests/Images/Quick_logo.png";
import avatarImg from "../assests/Images/avatarImg.png";
import { Link,useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase.js";
import { toast } from "react-toastify";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import {Container,Row,Col} from "reactstrap"

const Register = () => {
  const [image, setimage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const displayName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user

      const storageRef = ref(storage, `profiles/${Date.now() + displayName.split(" ")[0]}`);

      const uploadTask = uploadBytesResumable(storageRef,file);

      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
        (error) => {
          toast.error("Error while uploading image");
        },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{

            
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db,"users",user.uid), {
              uid:user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db,"userChats",user.uid), {

            });

           })

          })
          toast.success("Account successfully registered!")
          navigate("/login");
        }catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <div className="formContainer">
      <Container>
        <Row>
          <Col>
  
      <div className="formWrapper">
        <span className="logo">
          <img src={quick_logo} alt="" />
        </span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={handleImageChange}
          />
          <label htmlFor="file">
            {image ? (
              <img
                className="uploaded_avatarImg"
                src={URL.createObjectURL(image)}
                alt=""
              />
            ) : (
              <img className="avatarImg" src={avatarImg} alt="" />
            )}
            {/* {image?image.name:"Choose an image"} */}
          </label>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
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

          <button type="submit">SIGN UP</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>
      </div>
      </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
