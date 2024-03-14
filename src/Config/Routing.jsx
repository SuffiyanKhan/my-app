// import React, { useEffect, useState } from 'react'
// import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { auth,onAuthStateChanged } from './FirebaseConfig'
// import Login from '../Pages/Login'
// import Signup from '../Pages/Signup'
// import Home from '../Pages/Home'
// import { useContext } from 'react'
// import { uids } from '../Context/Context'
// import AdminDahsboard from '../Components/Admin Dahsboard/AdminDahsboard'
// import SelecteTrainer from '../Components/SelectTrainer/SelecteTrainer'
// import StudentDhsboard from '../Components/Student Dashboard/StudentDhsboard'
// import TeacherDashboard from '../Components/TeacherDashboard/TeacherDashboard'
// export default function Router() {
//   let [User,setUser]=useState(false)
//   useEffect(()=>{
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         setUser(true)
//       } else {
//       }
//     });
//   },[])
//   const getData = useContext(uids)
//   if (!getData) {
//     return <div>Loading...</div>;
//   }
//   console.log(getData)
 
//   const { student, teacher } = getData;


//   return (
//     <div>
//         <BrowserRouter>
//         <Routes>
//             <Route path='/' element={  <Login/>} />
//             <Route path='/signup' element={  <Signup/> } />
//             <Route path='/home' element={<Home/>} />
//             <Route path='/selectedtrainer' element={<SelecteTrainer/>} />
//             <Route path='/adminDahsboard' element={< AdminDahsboard/>} />
//             <Route path='/studentDashboard' element={< StudentDhsboard/>} />
//             <Route path='/teacherDashboard' element={< TeacherDashboard/>} />
//             {/* User ? <Navigate to={'/home'} /> :
// User ? <Navigate to={'/home'} /> : */}
//         </Routes>
//         </BrowserRouter>
//     </div>
//   )
// }


// Import necessary libraries and components
import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { onAuthStateChanged, auth,  db,collection  } from './FirebaseConfig';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Home from '../Pages/Home';
import { uids } from '../Context/Context';
import AdminDahsboard from '../Components/Admin Dahsboard/AdminDahsboard';
import SelecteTrainer from '../Components/SelectTrainer/SelecteTrainer';
import StudentDhsboard from '../Components/Student Dashboard/StudentDhsboard';
import TeacherDashboard from '../Components/TeacherDashboard/TeacherDashboard';

import {auth, onAuthStateChanged,collection, onSnapshot, db, } from "./FirebaseConfig"
export default function AppRouter() {
  // const getData = useContext(uids);
  const [user, setUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (userData) => {
 if (userData) {
        const uid = userData.uid;

        const adminCollection = collection(db, "All Teachers");
        onSnapshot(adminCollection, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const adminEmail = await change.doc.data().email;

              if (adminEmail == userData.email) {
                setIsAdmin(true);
              }
              console.log("admin email --->", adminEmail);
            }
          });
        });

        const studentCollection = collection(db, "All Students");
        onSnapshot(studentCollection, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === "added") {
              const studentEmail = await change.doc.data().email;

              if (studentEmail == userData.email) {
                setIsStudent(true);

              }
              console.log("studentCollection email --->", studentEmail);
            }
          });
        });



        console.log("current user Email --->", userData.email);
      }
    });
      // if (userData) {
      //   setUser(true);
      // }
    // });
  }, []);

  // if (!getData) {
  //   return <div>Loading...</div>;
  // }

  // const { student, teacher } = getData;Login
  let loginData =(e)=>{
    console.log(e.target.value)
  }
   

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login  loginData={loginData}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/selectedtrainer" element={<SelecteTrainer />} />
          <Route path="/adminDahsboard" element={<AdminDahsboard />} />
          <Route path="/studentDashboard" element={<StudentDhsboard />} />
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          {/* {user ? <Navigate to={teacher ? '/teacherDashboard' : '/home'} /> : null} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

