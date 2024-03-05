import React, { useState } from 'react'
import { auth,signInWithEmailAndPassword } from '../../Config/FirebaseConfig';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export default function AppLogin() {
  let [email,setEmail]=useState('')
  let[password,setPassword]=useState('')
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const navigate = useNavigate()
  let login =()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    Swal.fire({
      title: "Good job!",
      text: "Login successfully",
      icon: "success"
    }).then((result)=>{
      if(result){
        navigate('/home')
      }
    })
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    Swal.fire({
      title: "Error!",
      text: `${errMessage} !`,
      icon: "error"
    });
    // console.log(errMessage)
  });

}
let openHiddenPopup=()=>{
  setPopupVisibility(true)
}
let closePopup =()=>{
  setPopupVisibility(false)
}
  return (
    <div>
      <div className="container">
        <div className="row mt-5">
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
            <button className="btn btn-dark" onClick={login} >Login</button>
          </div>
          <div className="text-center mt-3">
            <p>I have no account ? <Link onClick={openHiddenPopup}>Registration</Link></p> 
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
                    <Link to={'/adminDahsboard'}><button className='btn btn-light' >Teacher Registration</button></Link>
                  </div>
                </div>
            </div>
        </div>
      </section>
        //   <div className="hiddenPopup">
        // <div className="mainHiddenPopup">
        //   <h2>Update todo</h2>
        //   <div className="getinput">
        //     <input className='form-control'   placeholder='Enter new value' type="text" />
        //   </div>
        //   <div className="buttons">
        //     <button ><i className="fa-regular fa-pen-to-square"></i> Edit</button>
        //     <button >Close</button>
        //   </div>

        // </div>
        // </div>
        //   <div className="container hiddenPopup">
        //     <div className="row">
        //         <div className="col-12">
        //           <div>
        //             <p>Are you Teacher or Student</p>
        //             <button><i class="fa-solid fa-xmark"></i></button>
        //           </div>
        //             <Link to={'/signup'}><button>Student Addmission</button></Link>
        //             <Link to={'/adminDahsboard'}><button>Teacher Join</button></Link>
        //         </div>
                 
        //     </div>
        // </div>
        )
      }
      
    </div>
  )
}
