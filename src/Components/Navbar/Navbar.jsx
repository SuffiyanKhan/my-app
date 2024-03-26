import './Navbar.css'
import logo from '../Images/logo.png'
import { auth, deleteUser, onAuthStateChanged , deleteDoc , doc , db,getDocs, collection } from '../../Config/FirebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { memo, useEffect, useState } from 'react';
 

function AppNavbar() {
  
  const [studentId , setStudentId] = useState('')
  const [teacherName , setTeacherName] = useState('')
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, studentId));
      querySnapshot.forEach((doc) => {
        if(!doc){
          alert('Data not yet')
        }else if(!doc.data()){
          alert('data not yet')
        }else{
           setTeacherName(doc.data().TeacherName);
           
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }  
  };
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setStudentId(uid);
      }
    });
    if (studentId) {
      getData();
    }
    return () => {
      unsubscribe();
    };
    
  },[])
   
  const navigate = useNavigate()
  const logout = () => {
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
            });
          }
        })
      }
    });
    
  };
  let deleteAccount=()=>{
    try {
       deleteUser(auth.currentUser).then(async() => {
        await deleteDoc(doc(db, "All Students", studentId));
          await deleteDoc(doc(db, teacherName, studentId));
          await deleteDoc(doc(db, studentId, studentId));
          navigate('/')
            console.log('successfully')
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = errorCode.slice(5).toUpperCase();
            const errMessage = errorMessage.replace(/-/g, " ")
            if(errMessage === "REQUIRES RECENT LOGIN"){
              alert("Please logout and again login and then delete account")
            }
            console.log(errMessage)  
          })    
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = errorCode.slice(5).toUpperCase();
      const errMessage = errorMessage.replace(/-/g, " ")
      console.log(errMessage)  
    }
    
      
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-color px-5 border-bottom position-sticky">
  <div className="container-fluid">
    <img src={logo} className='navbar-brand img-fluid' style={{width : 70}} />
    <button className="navbar-toggler bg-primary outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <i className="fa-solid fa-bars text-light"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to={'/student dashboard'}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/student classes"}>Classes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" onClick={deleteAccount}>Delete Account</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default memo(AppNavbar);