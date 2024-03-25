import './TeacherNavbar.css'
import logo from '../Images/logo.png'
import { auth, onAuthStateChanged, doc , getDoc, db } from '../../Config/FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { memo, useEffect, useState } from 'react';
import image from '../Images/logo.png'
import Loader from '../Loader/Loader';





function TeacherNavbar() {
  const [logoutLoader , setLogoutloader] = useState(false);
  const [teacherName , setTeacherName] = useState("")
  const [teacherEmail , setTeacherEmail] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth,async (user) => {
      if (user) {
        try {
          const teacherId = user.uid
          const docRef = doc(db, "All Teachers", teacherId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setTeacherName(docSnap.data().Name);
            setTeacherEmail(docSnap.data().Email);
        } else {
        console.log("No such document!");
  }
          
      } catch (error) {
        console.log(error)
          
      }
        } else {
        navigate('/')
      }
    });
  },[])


   
   
  // console.log(getData)
  // setDataOfTeacher(getData)
  const logout = () => {
    setLogoutloader(true)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Logout Successfully!",
          icon: "success"
        }).then((result)=>{
          if(result){
            auth.signOut().then(() => {
              navigate('/');
              window.location.reload()
            }).catch ((error)=>{
              console.log("error")
              setLogoutloader(false)
            }).finally(()=>{
              setLogoutloader(false)
            })
          }
        })
      }else{
        setLogoutloader(false)
      }
    });
    
  };
  return (
    <>
    {
      logoutLoader ?  <Loader/> :
      (
        <div>
        <nav className="navbar navbar-expand-lg bg-body-color px-5 border-bottom position-sticky">
        <div className="container-fluid">
          <img src={logo} className='navbar-brand img-fluid' style={{width : 70}} />
          <button className="navbar-toggler bg-primary outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars text-light"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <Link className="nav-link active fw-semibold" style={{cursor : 'pointer'}}  to={'/teacher dashboard'} aria-current="page">All Students</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active fw-semibold" style={{cursor : 'pointer'}}  to={'/classes'} aria-current="page">Classes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fw-semibold" style={{cursor : 'pointer'}}   aria-current="page"  ><p data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"> Profile</p></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
  className="offcanvas offcanvas-end"
  tabIndex={-1}
  id="offcanvasExample"
  aria-labelledby="offcanvasExampleLabel"
>
  <div className="offcanvas-header px-2 py-0">
    <div className="d-flex align-items-center   px-2">
      <div className=' border rounded-circle' style={{width : "50px",  height : "50px" }}>
      <img src={image} className='img-fluid w-100' alt="" />
      </div>
      <div className='ms-3'>
    <p className="offcanvas-title   fw-bold p-0 mt-2" id="offcanvasExampleLabel">
       {
        teacherName
        //  getData.Name 
       }
    </p>
    <p className='p-0'>
      {
        teacherEmail
        // getData.Email 
      }
    </p>
      </div>
    </div>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    />
  </div>
  <hr className="divider" />
  <div className="offcanvas-body">
    <div className="d-flex flex-column ">
      <button className='btn btn-light mb-3 text-start px-4 text-capitalize fs-6'>Manage Account</button>
      <Link to={'/teacher registration'} > <button className='btn btn-light mb-3 text-start px-4 text-capitalize fs-6'>Add Account</button></Link>
      <button className='btn btn-light mb-3 text-start px-4 text-capitalize fs-6' onClick={logout} >Sign out</button>
      <button className='btn btn-light mb-3 text-start px-4 text-capitalize fs-6'>Delete Account</button>
    </div>
  </div>
</div>
    </div>
      )
    }
   
    </>

  );
}

export default memo(TeacherNavbar);