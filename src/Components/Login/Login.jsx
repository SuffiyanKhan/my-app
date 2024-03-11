import React, { useState } from 'react'
import { auth,signInWithEmailAndPassword, collection, db, onSnapshot } from '../../Config/FirebaseConfig';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export default function AppLogin() {
  let [email,setEmail]=useState('')
  let[password,setPassword]=useState('')
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [loader , setLoader] = useState(false)
  const navigate = useNavigate()
  let login =()=>{
    setLoader(true)
    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    try {
      const user = userCredential.user;
    console.log(user.uid)
    const q = (collection(db, "All Teachers"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if(change.doc.id === user.uid ){
    setLoader(false)
      alert("Teacher Dashboard")
    }
  });
});
const q2 = (collection(db, "All Students"));
const unsubscribes = onSnapshot(q2, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if(change.doc.id === user.uid ){
      Swal.fire({
      title: "Good job!",
      text: "Login successfully",
      icon: "success"
    }).then((result)=>{
      if(result){
        setLoader(false)
        navigate('/home')
      }
    })
    }      
  });
});
      
    } catch (error) {
    setLoader(false)
      
    }finally{
    setLoader(false)

    }
     
  })
  .catch((error) => {
    setLoader(false)

    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    Swal.fire({
      title: "Error!",
      text: `${errMessage} !`,
      icon: "error"
    });
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
            {
              loader ? "Loading ..." : <button className="btn btn-dark" onClick={login} >Login</button>
            }
            
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
        )
      }
      
    </div>
  )
}
