import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth, createUserWithEmailAndPassword,storage, ref, uploadBytesResumable, getDownloadURL, doc, setDoc, db} from '../../Config/FirebaseConfig'
import Swal from 'sweetalert2'
import { Spin } from 'antd';

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
  const [loader ,setLoader] = useState(false)
  const [image, setImage] = useState(null);
  const [btnLoader,setBtnLoader] = useState(false)
  const [imageURL,setImageURL] =useState('')


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  let uploadFiles=()=>{
    const mountainImagesRef = ref(storage, `images/studentsImage/${image.name}`);
    const uploadTask = uploadBytesResumable(mountainImagesRef, image);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    // setLoaderNumber(progress);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        setBtnLoader(true)
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    alert("try again")
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImageURL(downloadURL)
      setBtnLoader(false)
    })
  }
);
  }

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
        days,
        imageURL
      }
     }
    setLoader(true)
    createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    try {
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
      UserId : user.uid,
      Image : imageURL
    });
    console.log(user.uid)
      
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
      text: errMessage + "!",
      icon: "error"
    });
  });
  }
  let back =()=> {
    navigate('/')
  }
  return (
    <div style={{width : "100%" , height : "130vh", backgroundColor : "#96B6C5"}}>
      <div className="container">
        <div className="row d-flex">
          <div className="mt-5"><button id='back-btn' onClick={back} ><i className="fa-solid fa-arrow-left"></i></button></div>
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
          <div className="col-lg-12col-sm-12 col-md-12 mt-3">
            <p className='text-capitalize fw-bold'>Upload your picture (optional)</p>
          <label htmlFor='image' className='border text-center lh-lg rounded w-25' style={{height : "40px", cursor : 'pointer'}} ><i class="fa-solid fa-upload"></i> Upload Picture</label>
             <input type="file" onChange={handleImageChange} id='image' className='rounded' style={{display :'none'}} />
             <button className='btn btn-dark mx-3' onClick={uploadFiles}>{btnLoader ? <Spin /> : ' Upload'}</button>
          </div>
          <div className="mt-5 justify-content-center d-flex justify-content-center">
            <button className="btn btn-dark" onClick={registration}   >
              {loader ? "loading ..." : "Registration"}
              
            </button>
          </div>
          <div className="text-center mt-5">
            <p>I have arledy an account ?  <Link to={'/'} className='text-dark' >Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
