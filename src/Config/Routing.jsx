import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Home from '../Pages/Home'
import TeacherRegistration from '../Pages/TeacherRegistration'
import TeacherDashboard from '../Pages/TeacherDashboard'
import SelectTrainer from '../Components/SelectTrainer/SelecteTrainer'
import { auth, onAuthStateChanged, collection, db, onSnapshot } from './FirebaseConfig';
import Classes from '../Components/Classes/Classes'
import Navbar from '../Components/Navbar/Navbar'
import TeacherNavbar from '../Components/TeacherNavbar/Navbar'
import StudentClasses from '../Components/StudentClasses/StudentClasses'
 

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
      <>
      {student ? <Navbar /> : teacher ? <TeacherNavbar /> : null}
      </>
      <Routes>
        {/* main routung of pages */}
        <Route path='/' element={teacher ? <Navigate to={"/teacher dashboard"} /> : student ? <Navigate to={"/student dashboard"} /> : <Login />} />
        <Route path='/signup' element={ <Signup />} />
        <Route path='/selected Trainer' element={  <SelectTrainer/>} />
        <Route path='/teacher registration' element={ teacher ? <Navigate to={"/teacher dashboard"} /> : <TeacherRegistration />} />
        <Route path='/teacher dashboard' element={ teacher ? < TeacherDashboard /> : <Navigate to={'/'} />} />
        <Route path='/student dashboard' element={ student ? <Home /> : <Navigate to={'/'} /> } />
        <Route path='/classes' element={ <Classes/>} />
        <Route path='/student classes' element={ <StudentClasses/>} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing
