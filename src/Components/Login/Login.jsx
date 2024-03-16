import React, { useState } from 'react'
import { auth,signInWithEmailAndPassword } from '../../Config/FirebaseConfig';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import './Login.css'

 function AppLogin() {

let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [loader, setLoader] = useState(false);
   
let login =()=>{
  setLoader(true)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setLoader(false)
    console.log(user)
  })
  .catch((error) => {
    setLoader(false)
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    console.log(errMessage)
    if(errMessage === "INVALID EMAIL"){
      Swal.fire({
        title: "Error!",
        text: " INVALID EMAIL!",
        icon: "error"
      });
    }else if(errMessage === "MISSING PASSWORD"){
      Swal.fire({
        title: "Error!",
        text: "MISSING PASSWORD!",
        icon: "error"
      });
    }else if (errMessage === "INVALID CREDENTIAL"){
      Swal.fire({
        title: "Error!",
        text: "INVALID CREDENTIAL!",
        icon: "error"
      });
    }
  });
}

let openHiddenPopup = () => {
  setPopupVisibility(true);
};

let closePopup = () => {
  setPopupVisibility(false);
};
 
  return (
    <div style={{width : "100%" , height : "100vh", backgroundColor : "#96B6C5"}}>
      <div className="container">
        <div className="row ">
          <div className="m-auto w-100 mt-5 p-5">
          <h2>Login</h2>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
            <label>Email</label>
            <input type="email" placeholder='Email' className='form-control' onChange={(e) => {setEmail(e.target.value)}} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
            <label>Password</label>
            <input type="password" placeholder='Password' className='form-control' onChange={(e) => {setPassword(e.target.value)}} />
          </div>
          <div className="col-12 mt-3">
            <Link>Forgot Password</Link>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
            <input type="checkbox" />
            <label className='ms-2'>Remember me</label>
          </div>
          <div className="mt-5 d-flex justify-content-center">
            {/* data("hi")login */}
            <button className="btn btn-dark" onClick={()=>{login()}}>
              {
                loader ? "Loading ..." : "Login"
              }
            </button>            
          </div>
          <div className="text-center mt-3">
            <p>I have no account ? <Link onClick={openHiddenPopup} style={{color : 'black'}}>Registration</Link></p> 
          </div>
          </div>
        </div>
      </div>
      {
        isPopupVisible && (
          <section className='hiddenPopup'>
      <div className="container ">
            <div className="row mainHiddenPopup">
                <div className="col-12">
                  <div className='head mt-3'>
                    <p>Registration</p>
                    <button id='closer-btn' onClick={closePopup}><i class="fa-solid fa-xmark"></i></button>
                  </div>
                  <p>Are your teacher or student</p>
                  <div className="buttons mt-3">
                    <Link to={'/signup'}><button className='btn btn-light' >Student Registration</button></Link>
                    <Link to={'/teacher registration'}><button className='btn btn-light' >Teacher Registration</button></Link>
                  </div>
                </div>
            </div>
        </div>
      </section>
        )
      }
      
      
    </div>
  )
}
export default React.memo(AppLogin)
 