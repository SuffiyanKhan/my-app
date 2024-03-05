import React, { useState } from 'react';
import { Spin } from 'antd';
import {storage, ref, uploadBytesResumable, getDownloadURL, auth, createUserWithEmailAndPassword, setDoc, doc,  db, sendEmailVerification} from "../../Config/FirebaseConfig"
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'



const MyForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [fatherName,setFatherrName]=useState('')
  const [cnicNumber, setCNIC] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber,setPhoneNumber]= useState('')
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoader,setBtnLoader] = useState(false)
  const [signupBtn,setSignupBtn] = useState(false)
  const [qualification, setQualification] = useState('');
  const [selectedCourses ,setSelectedCourse] =useState('')
  const [SelectedGender,setSelectedGender] =useState('')
  const [dateOfBirth,setDateOfBirth]=useState('')
  const [imageURL,setImageURL] =useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  let handleQualificationChange =(e)=>{
    setQualification(e.target.value)
  }
  let selectedCourse =(e)=>{
    setSelectedCourse(e.target.value)
  }
  let selectedGender =(e)=>{
    setSelectedGender(e.target.value)

  }
  const navigate = useNavigate()
  const handleSubmit = async () => {
    if (!userName || !email || !password || !cnicNumber || !imageURL || !phoneNumber || !qualification || !selectedCourses || !SelectedGender) {   
      alert("Please fill in all the required fields");
    }else{
      setLoading(true);
      setSignupBtn(true)
  
      const formData = {
        userName,
        email,
        password,
        cnicNumber,
        dateOfBirth,
        qualification,
        selectedCourses,
        SelectedGender,
        phoneNumber,
        fatherName,
        imageURL
      };  
      try {
           createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    await setDoc(doc(db, "All Students", user.uid), {
      Name: formData.userName,
      Email : formData.email ,
      Password : formData.password ,
      Father_Name : formData.fatherName ,
      CNIC : formData.cnicNumber ,
      DateOfBirth : formData.dateOfBirth ,
      Qualification : formData.qualification ,
      Gender : formData.SelectedGender ,
      Courses : formData.selectedCourses ,
      Phone_Number : formData.phoneNumber ,
      image_URL : formData.imageURL

    });
    
    setSignupBtn(false)
    navigate('/home') 
    
    console.log(user)

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = errorCode.slice(5).toUpperCase();
    const errMessage = errorMessage.replace(/-/g, " ");
    console.log(errMessage)
    // ..
  });
        // await data(formData);
        setImage(null);
      } catch (error) {
        console.error('Error submitting data to Firebase:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  let uploadFiles=()=>{
    const mountainImagesRef = ref(storage, `images/studentsImage/${image.name}`);
    const uploadTask = uploadBytesResumable(mountainImagesRef, image);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
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
      console.log('File available at', downloadURL);
    })
  }
);
    // console.log(image.name)
  }
  const back=()=>{
    navigate('/')
  }
  
  return (
    <div>
      <div className="container">
        <div className="row d-flex">
          <div className="mt-4"><button id='back-btn' onClick={back}><i class="fa-solid fa-arrow-left"></i></button></div>
          <h2 className="mt-3"> ADDMISSION</h2>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Full name</label>
            <input type="text" className='form-control' placeholder='Full Name' onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Father name</label>
            <input type="text" className='form-control' placeholder='Father name' onChange={(e) => setFatherrName(e.target.value)} />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Email</label>
            <input type="email" className='form-control' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Password</label>
            <input type="password" className='form-control' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Phone number</label>
            <input type="number" className='form-control' placeholder='Phone number' onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>CNIC</label>
            <input type="number" className='form-control' placeholder='CNIC' onChange={(e) => setCNIC(e.target.value)} />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
            <label>Date of birth</label>
            <input type="date" className='form-control' placeholder='Enter Full Name' onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
              <label className='form-label'> Selected course </label>
              <select className="form-select" aria-label="Default select example" onChange={selectedCourse}>
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
              <label className='form-label'> Selected gender </label>
              <select className="form-select" aria-label="Default select example" onChange={selectedGender} >
                  <option> Selected gender</option>
                  <option value="Male">Male</option>
                  <option value="Felmale">Felmale</option>
              </select>
          </div>
          <div className="col-lg-6 col-sm-12 col-md-12 mt-3">
              <label className='form-label'>Last Qualification </label>
              <select className="form-select" aria-label="Default select example" onChange={handleQualificationChange}>
                  <option>Last Qualification</option>
                  <option value="Matriculation">Matriculation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Under Graduate">Under Graduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
              </select>
          </div>
          <div className="col-lg-12col-sm-12 col-md-12 mt-3">
            <label>Address</label>
            <input type="text" className='form-control' placeholder='Enter Full Name' />
          </div>
          <div className="col-lg-12col-sm-12 col-md-12 mt-3">
          <label htmlFor='image' className='border text-center lh-lg' style={{width : "140px",height : "40px"}} >Picture</label>
             <input type="file" onChange={handleImageChange} id='image' style={{display :'none'}} />
             <button className='btn btn-dark mx-3' onClick={uploadFiles}>{btnLoader ? <Spin /> : ' Upload'}</button>
          </div>
          <div className="mt-5 justify-content-center d-flex justify-content-center">
            <button className="btn btn-dark" onClick={handleSubmit} disabled={loading} style={{display :  imageURL ? "block" : " none"}}>
              {signupBtn ? 'Loading...' : 'REGISTRATION'}
            </button>
          </div>
          <div className="">
            <p>I have arledy an account ? <Link to={'/'}>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForm;




