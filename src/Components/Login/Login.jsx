import React, { useEffect, useState } from 'react'
import { auth,signInWithEmailAndPassword, collection, db, onSnapshot } from '../../Config/FirebaseConfig';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export default function AppLogin() {
  // let [email,setEmail]=useState('')
  // let[password,setPassword]=useState('')
  // const [isPopupVisible, setPopupVisibility] = useState(false);
  // const [loader , setLoader] = useState(false)
  // const [teacherUid , setTeacherUid] =useState([])
  // const [studentUid , setstudentUid] =useState([])
  // const navigate = useNavigate()

   
//   let login =()=>{
//     setLoader(true)
    
//     signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     try {
//       const user = userCredential.user;
//     console.log(user.uid)
    
//     } catch (error) {
//     setLoader(false)
      
//     }finally{
//     setLoader(false)

//     }
     
//   })
//   .catch((error) => {
//     setLoader(false)

//     const errorCode = error.code;
//     const errorMessage = errorCode.slice(5).toUpperCase();
//     const errMessage = errorMessage.replace(/-/g, " ");
//     Swal.fire({
//       title: "Error!",
//       text: `${errMessage} !`,
//       icon: "error"
//     });
//    });
// }
// let login = () => {
//   setLoader(true);

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       try {
//         const user = userCredential.user;
//         console.log(user.uid);

//         // Check if the user is a teacher
//         if (teacherUid.includes(user.uid)) {
//           setLoader(false);
//           Swal.fire({
//             title: "Good job!",
//             text: "Login successfully",
//             icon: "success",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               setLoader(false);
//               navigate('/teacherDashboard');
//             }
//           });
//         } else if (studentUid === user.uid) {
//           // Check if the user is a student
//           setLoader(false);
//           Swal.fire({
//             title: "Good job!",
//             text: "Login successfully",
//             icon: "success",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               setLoader(false);
//               navigate('/home');
//             }
//           });
//         } else {
//           // User not found or role not identified
//           setLoader(false);
//           Swal.fire({
//             title: "Error!",
//             text: "Invalid credentials or role",
//             icon: "error",
//           });
//         }
//       } catch (error) {
//         setLoader(false);
//       }
//     })
//     .catch((error) => {
//       setLoader(false);

//       const errorCode = error.code;
//       const errorMessage = errorCode.slice(5).toUpperCase();
//       const errMessage = errorMessage.replace(/-/g, " ");
//       Swal.fire({
//         title: "Error!",
//         text: `${errMessage} !`,
//         icon: "error",
//       });
//     });
// };

let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [loader, setLoader] = useState(false);
  const [teacherUid, setTeacherUid] = useState([]); // Store teacher IDs in an array
  const [studentUid, setStudentUid] = useState(''); // Store student ID as a single value
  const navigate = useNavigate();

  useEffect(() => {
    let getTeacherIds = async () => {
      const teacherIds = [];

      const q = collection(db, "All Teachers");
      const unsubscribe = await onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          teacherIds.push(doc.id);
          console.log(doc.id);
        });

        setTeacherUid(teacherIds);
      });
    };

    getTeacherIds();

    const q2 = collection(db, "All Students");
    const unsubscribeStudents = onSnapshot(q2, (snapshot) => {
      if (snapshot.docs.length > 0) {
        const studentId = snapshot.docs[0].id; // Assuming there is only one student ID
        setStudentUid(studentId);
      }
    });

    return () => {
      unsubscribeStudents();
    };
  }, []);

  // ... Your other functions ...

  let login = () => {
    setLoader(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        try {
          const user = userCredential.user;

          if (teacherUid.includes(user.uid)) {
            setLoader(false);
            Swal.fire({
              title: "Good job!",
              text: "Login successfully",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                setLoader(false);
                navigate('/teacherDashboard');
              }
            });
          } else if (studentUid === user.uid) {
            setLoader(false);
            Swal.fire({
              title: "Good job!",
              text: "Login successfully",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                setLoader(false);
                // navigate('/home');
              }
            });
          } else {
            setLoader(false);
            Swal.fire({
              title: "Error!",
              text: "Invalid credentials or role",
              icon: "error",
            });
          }
        } catch (error) {
          setLoader(false);
        }
      })
      .catch((error) => {
        setLoader(false);

        const errorCode = error.code;
        const errorMessage = errorCode.slice(5).toUpperCase();
        const errMessage = errorMessage.replace(/-/g, " ");
        Swal.fire({
          title: "Error!",
          text: `${errMessage} !`,
          icon: "error",
        });
      });
  };

let openHiddenPopup=()=>{
  setPopupVisibility(true)
}
let closePopup =()=>{
  setPopupVisibility(false)
}
console.log(teacherUid)
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
            <button className="btn btn-dark" onClick={login} >
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


// ... Your other imports and component code ...

// export default function AppLogin() {
//   let [email, setEmail] = useState('');
//   let [password, setPassword] = useState('');
//   const [isPopupVisible, setPopupVisibility] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const [teacherUid, setTeacherUid] = useState([]); // Store teacher IDs in an array
//   const [studentUid, setStudentUid] = useState(''); // Store student ID as a single value
//   const navigate = useNavigate();

//   useEffect(() => {
//     let getTeacherIds = async () => {
//       const teacherIds = [];

//       const q = collection(db, "All Teachers");
//       const unsubscribe = await onSnapshot(q, (snapshot) => {
//         snapshot.docs.forEach((doc) => {
//           teacherIds.push(doc.id);
//           console.log(doc.id);
//         });

//         setTeacherUid(teacherIds);
//       });
//     };

//     getTeacherIds();

//     const q2 = collection(db, "All Students");
//     const unsubscribeStudents = onSnapshot(q2, (snapshot) => {
//       if (snapshot.docs.length > 0) {
//         const studentId = snapshot.docs[0].id; // Assuming there is only one student ID
//         setStudentUid(studentId);
//       }
//     });

//     return () => {
//       unsubscribeStudents();
//     };
//   }, []);

//   // ... Your other functions ...

//   let Login = () => {
//     setLoader(true);

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         try {
//           const user = userCredential.user;

//           if (teacherUid.includes(user.uid)) {
//             setLoader(false);
//             Swal.fire({
//               title: "Good job!",
//               text: "Login successfully",
//               icon: "success",
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 setLoader(false);
//                 navigate('/teacherDashboard');
//               }
//             });
//           } else if (studentUid === user.uid) {
//             setLoader(false);
//             Swal.fire({
//               title: "Good job!",
//               text: "Login successfully",
//               icon: "success",
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 setLoader(false);
//                 navigate('/home');
//               }
//             });
//           } else {
//             setLoader(false);
//             Swal.fire({
//               title: "Error!",
//               text: "Invalid credentials or role",
//               icon: "error",
//             });
//           }
//         } catch (error) {
//           setLoader(false);
//         }
//       })
//       .catch((error) => {
//         setLoader(false);

//         const errorCode = error.code;
//         const errorMessage = errorCode.slice(5).toUpperCase();
//         const errMessage = errorMessage.replace(/-/g, " ");
//         Swal.fire({
//           title: "Error!",
//           text: `${errMessage} !`,
//           icon: "error",
//         });
//       });
//   };

//   // ... The rest of your component code ...
// }
