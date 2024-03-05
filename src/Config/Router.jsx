import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { auth,onAuthStateChanged } from './FirebaseConfig'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Home from '../Pages/Home'
// import Selected from '../Components/Selected/selected'
import AdminDahsboard from '../Components/Admin Dahsboard/AdminDahsboard'
export default function Router() {
  let [User,setUser]=useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(true)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  },[])
  return (
    <div>
        <BrowserRouter>
        <Routes>
            {/* <Route path='/' element={<Login/>} /> */}
            <Route path='/' element={ User ? <Navigate to={'/home'} /> : <Login/>} />
            <Route path='/signup' element={ User ? <Navigate to={'/home'} /> : <Signup/> } />
            <Route path='/home' element={<Home/>} />
            {/* <Route path='/selected' element={<Selected/>} /> */}
            <Route path='/adminDahsboard' element={< AdminDahsboard/>} />
        </Routes>
        </BrowserRouter>
    </div>
  )
}
