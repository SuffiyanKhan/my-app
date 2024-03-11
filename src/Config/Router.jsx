import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { auth,onAuthStateChanged } from './FirebaseConfig'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Home from '../Pages/Home'
import AdminDahsboard from '../Components/Admin Dahsboard/AdminDahsboard'
import SelecteTrainer from '../Components/SelectTrainer/SelecteTrainer'
import StudentDhsboard from '../Components/Student Dashboard/StudentDhsboard'
import TeacherDashboard from '../Components/TeacherDashboard/TeacherDashboard'
export default function Router() {
  let [User,setUser]=useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(true)
      } else {
      }
    });
  },[])
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={ User ? <Navigate to={'/home'} /> : <Login/>} />
            <Route path='/signup' element={ User ? <Navigate to={'/home'} /> : <Signup/> } />
            <Route path='/home' element={<Home/>} />
            <Route path='/selectedtrainer' element={<SelecteTrainer/>} />
            <Route path='/adminDahsboard' element={< AdminDahsboard/>} />
            <Route path='/studentDashboard' element={< StudentDhsboard/>} />
            <Route path='/teacherDashboard' element={< TeacherDashboard/>} />
            {/* User ? <Navigate to={'/home'} /> :
User ? <Navigate to={'/home'} /> : */}
        </Routes>
        </BrowserRouter>
    </div>
  )
}
