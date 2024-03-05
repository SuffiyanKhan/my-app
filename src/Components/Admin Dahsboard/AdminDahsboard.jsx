import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth, createUserWithEmailAndPassword, doc, setDoc, db} from '../../Config/FirebaseConfig'
import Swal from 'sweetalert2'

export default function AdminDahsboard() {
  const navigate = useNavigate()
  const [teacherName , setTeacherName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [phoneNumber , setPhoneNumber] = useState('')
  const [CNIC , setCNIC] = useState('')
  const [selectedCourses , setselectedCourses] = useState('')
  const [timming , setTimming] = useState('')
  const [days , setDays] = useState('')

  let registration =()=>{
    if( !teacherName){
      alert('Enter Teacher Name')
    }else if(!email){
      alert('Enter email')
    }else if(!password){
      alert('Enter password')
    }else if(!CNIC){
      alert('Enter CNIC')
    }else if(!selectedCourses){
      alert('Enter selectedCourses')
    }else if(!timming){
      alert('Enter timming')
    }else if(!days){
      alert('Enter days')
    }else if(!phoneNumber){
      alert('Enter phoneNumber')
    }else  { 
      let obj ={
        teacherName,
        email,
        password,
        phoneNumber,
        CNIC,
        selectedCourses,
        timming,
        days
      }
      console.log(obj)
    }

    createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;
    await setDoc(doc(db, "All Teachers",user.uid), {
      Name:  teacherName,
      Email : email ,
      Password : password ,
      CNIC : CNIC ,
      Timming : timming ,
      Courses : selectedCourses ,
      Phone_Number : phoneNumber ,
      Days : days ,
      UserId : user.uid
    });
    console.log(user.uid)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    Swal.fire({
      title: "Error!",
      text: errMessage + "!",
      icon: "error"
    });
  });
  }
  let back =()=> {
    navigate('/')
  }
  return (
    <div>
      <div className="container">
        <div className="row d-flex">
          <div className="mt-4"><button id='back-btn' onClick={back} ><i className="fa-solid fa-arrow-left"></i></button></div>
          <h2 className="mt-3"> TEACHER REGISTRATION</h2>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Full name</label>
            <input type="text" className='form-control' placeholder='Full Name' onChange={(e) => {setTeacherName(e.target.value)}}   />
          </div>
           
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Email</label>
            <input type="email" className='form-control' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}  />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Password</label>
            <input type="password" className='form-control' placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}  />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Phone number</label>
            <input type="number" className='form-control' placeholder='Phone number' onChange={(e) => {setPhoneNumber(e.target.value)}}  />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>CNIC</label>
            <input type="number" className='form-control' placeholder='CNIC' onChange={(e) => {setCNIC(e.target.value)}}  />
          </div>
           
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
              <label className='form-label'> Selected course </label>
              <select className="form-select" aria-label="Default select example" onChange={(e) => {setselectedCourses(e.target.value)}}>
                  <option>Selected course</option>
                  <option value="React Js">React Js</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Web Designing">Web Designing</option>
                  <option value=".NET Web Application Development">.NET Web Application Development</option>
                  <option value="Advanced Digital Marketing">Advanced Digital Marketing</option>
                  <option value="Mobile Repairing">Mobile Repairing</option>
              </select>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
              <label className='form-label'> Selected days </label>
              <select className="form-select" aria-label="Default select example" onChange={(e) => {setDays(e.target.value)}}  >
                  <option> Selected days</option>
                  <option value="MWF">MWF</option>
                  <option value="TTS">TTS</option>
                  <option value="week end only">week end only</option>
                  <option value="All">All days escape sunday</option>
              </select>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Timing</label>
            <input type="text" placeholder='Enter your timing 12 to 2' className='form-control' onChange={(e) => {setTimming(e.target.value)}}/>
          </div>
          <div className="mt-5 justify-content-center d-flex justify-content-center">
            <button className="btn btn-dark" onClick={registration}   >
              Registration
            </button>
          </div>
          <div className="">
            <p>I have arledy an account ?  <Link to={'/'} >Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
