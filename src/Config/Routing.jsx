// // import React, { useEffect, useState } from 'react'
// // import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
// // import { auth,onAuthStateChanged, collection, onSnapshot, db } from './FirebaseConfig'
// // import Login from '../Pages/Login'
// // import Signup from '../Pages/Signup'
// // import Home from '../Pages/Home'
// // import { useContext } from 'react'
// // import { uids } from '../Context/Context'
// // import AdminDahsboard from '../Components/Admin Dahsboard/AdminDahsboard'
// // import SelecteTrainer from '../Components/SelectTrainer/SelecteTrainer'
// // import StudentDhsboard from '../Components/Student Dashboard/StudentDhsboard'
// // import TeacherDashboard from '../Components/TeacherDashboard/TeacherDashboard'
// // export default function Router() {
// //   let [User,setUser]=useState(false)
// //   useEffect(()=>{
// //     onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         const uid = user.uid;
// //         setUser(true)
// //       } else {
// //       }
// //     });
// //   },[])
// //   const getData = useContext(uids)
// //   if (!getData) {
// //     return <div>Loading...</div>;
// //   }
// //   console.log(getData)
 
// //   const { student, teacher } = getData;


// //   return (
// //     <div>
// //         <BrowserRouter>
// //         <Routes>
// //             <Route path='/' element={  <Login/>} />
// //             <Route path='/signup' element={  <Signup/> } />
// //             <Route path='/home' element={<Home/>} />
// //             <Route path='/selectedtrainer' element={<SelecteTrainer/>} />
// //             <Route path='/adminDahsboard' element={< AdminDahsboard/>} />
// //             <Route path='/studentDashboard' element={< StudentDhsboard/>} />
// //             <Route path='/teacherDashboard' element={< TeacherDashboard/>} />
// //             {/* User ? <Navigate to={'/home'} /> :
// // User ? <Navigate to={'/home'} /> : */}
// //         </Routes>
// //         </BrowserRouter>
// //     </div>
// //   )
// // }


// // Import necessary libraries and components
// import React, { useEffect, useContext, useState } from 'react';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// // import { onAuthStateChanged, auth,    } from './FirebaseConfig';
// import Login from '../Pages/Login';
// import Signup from '../Pages/Signup';
// import Home from '../Pages/Home';
// import { uids } from '../Context/Context';
// import AdminDahsboard from '../Components/Admin Dahsboard/AdminDahsboard';
// import SelecteTrainer from '../Components/SelectTrainer/SelecteTrainer';
// import StudentDhsboard from '../Components/Student Dashboard/StudentDhsboard';
// import TeacherDashboard from '../Components/TeacherDashboard/TeacherDashboard';
// import { auth,onAuthStateChanged, collection, onSnapshot, db } from './FirebaseConfig'
// import TeacherRegistration from '../Pages/TeacherRegistration';

// // import {auth, onAuthStateChanged,collection, onSnapshot, db, } from "./FirebaseConfig"
// export default function AppRouter() {
//   // const getData = useContext(uids);
//   const [user, setUser] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isStudent, setIsStudent] = useState(false);

//   useEffect(() => {
//     onAuthStateChanged(auth, (userData) => {
//  if (userData) {
//         const uid = userData.uid;
//         // console.log(uid)

//         const adminCollection = collection(db, "All Teachers");
//         onSnapshot(adminCollection, (snapshot) => {
//           snapshot.docChanges().forEach(async (change) => {
//             if (change.type === "added") {
//               console.log(uid)
//               console.log(change.doc.id)
//               // console.log(change.uid)
//               // const adminEmail = await change.doc.data().email;

//               // if (adminEmail === userData.email) {
//               //   setIsAdmin(true);
//               // }
//               // console.log("admin email --->", adminEmail);
//             }
//           });
//         });

//         const studentCollection = collection(db, "All Students");
//         onSnapshot(studentCollection, (snapshot) => {
//           snapshot.docChanges().forEach(async (change) => {
//             if(uid === change.doc.id){
//                 setIsStudent(true);
               
//             }
//             console.log(change.doc.id)
//           //   if (change.type === "added") {
//           //     console.log(change.doc.uid)
//           //     // const studentEmail = await change.doc.data().email;

//           //     // if (studentEmail == userData.email) {
//           //     //   setIsStudent(true);

//           //     // }
//           //     // console.log("studentCollection email --->", studentEmail);
//           //   }
//           });
//         });



//         console.log("current user Email --->", userData.email);
//       }
//     });
//   }, []);

//   // if (!getData) {
//   //   return <div>Loading...</div>;
//   // }

//   // const { student, teacher } = getData;Login
//   let loginData =(e)=>{
//     console.log(e.target.value)
//   }
   

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login  loginData={loginData}/>} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/selectedtrainer" element={<SelecteTrainer />} />
//           <Route path="/adminDahsboard" element={<AdminDahsboard />} />
//           <Route path="/studentDashboard" element={<StudentDhsboard />} />
//           <Route path="/teacherDashboard" element={<TeacherDashboard />} />
//           <Route path="/teacherRegiatration" element={<TeacherRegistration />} />
//           <Route path='/' element={isAdmin ? <Navigate to={"/teacherDashboard"} /> : isStudent ? <Navigate to={"/home"} /> : <Login />} />

//           {/* {user ? <Navigate to={teacher ? '/teacherDashboard' : '/home'} /> : null} */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Home from '../Pages/Home'
import TeacherRegistration from '../Pages/TeacherRegistration'
import TeacherDashboard from '../Pages/TeacherDashboard'
import SelectTrainer from '../Components/SelectTrainer/SelecteTrainer'
import { auth, onAuthStateChanged, collection, db, onSnapshot } from './FirebaseConfig';


function Routing() {
  const [teacher , setTeacherId] = useState(false)
  const [student ,setStudentId] = useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid)
        
        const teacherCollection = collection(db, "All Teachers");
        onSnapshot(teacherCollection, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const teacherId =  change.doc.id;
              if(teacherId === uid){
                setTeacherId(true)
                setStudentId(false)
              }
            }
          });
        });
        const studentCollection = collection(db, "All Students");
        onSnapshot(studentCollection, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const studentId =  change.doc.id;
              if(studentId === uid){
                setStudentId(true)
                setTeacherId(false)
              }
            }
          });
        });
      }
    });
  },[])
  if(student === true || teacher === true){
    console.log('studentId -->', student, 'teacherId -->', teacher)
  }
  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* main routung of pages */}
        <Route path='/' element={teacher ? <Navigate to={"/teacher dashboard"} /> : student ? <Navigate to={"/student dashboard"} /> : <Login />} />
        <Route path='/signup' element={ <Signup />} />
        <Route path='/selected Trainer' element={  <SelectTrainer/>} />
        <Route path='/teacher registration' element={ teacher ? <Navigate to={"/teacher dashboard"} /> : <TeacherRegistration />} />
        <Route path='/teacher dashboard' element={ teacher ? < TeacherDashboard /> : <Navigate to={'/'} />} />
        <Route path='/student dashboard' element={ student ? <Home /> : <Navigate to={'/'} /> } />
      </Routes>
      </BrowserRouter>
      {/* student ? <Navigate to={'/selected Trainer'}/> : */}
    </>
  )
}

export default Routing
