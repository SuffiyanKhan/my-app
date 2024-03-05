import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AdminDahsboard() {
  const [teacherName , setTeacherName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [phoneNumber , setPhoneNumber] = useState('')
  const [CNIC , setCNIC] = useState('')
  const [selectedCourses , setselectedCourses] = useState('')
  const [timming , setTimming] = useState('')
  const [days , setDays] = useState('')
  return (
    <div>
      <div className="container">
        <div className="row d-flex">
          <div className="mt-4"><button id='back-btn'  ><i class="fa-solid fa-arrow-left"></i></button></div>
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
              </select>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Timing</label>
            <input type="text" placeholder='Enter your timing 12 to 2' className='form-control' onChange={(e) => {setTimming(e.target.value)}}/>
              {/* <label className='form-label'>  Time  </label>
              <select className="form-select" aria-label="Default select example"  >
                  <option>Time </option>
                  <option value="9 To 11">9 To 11</option>
                  <option value="4 To 6">4 To 6</option>
                  <option value="7 To 9">7 To 9</option>
              </select> */}
          </div>
          <div className="mt-5 justify-content-center d-flex justify-content-center">
            <button className="btn btn-dark"    >
              Registration
              {/* {signupBtn ? 'Loading...' : 'REGISTRATION'} */}
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
