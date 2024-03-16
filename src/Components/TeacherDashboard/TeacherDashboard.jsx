import React, {memo, useEffect, useState} from 'react'
import { auth, onAuthStateChanged, doc , getDoc, db} from '../../Config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import TeacherNavbar from '../TeacherNavbar/Navbar';
import TeacherDashboardHeader from '../TeacherDashboardHeader/TeacherDashboardHeader';
import {TeacherBannerData, TeacherData} from '../../Context/Context'
function TeacherDashboard() {
    const [TeacherDatas , setTeacherDatas] =useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth,async (user) => {
          if (user) {
            try {
              const teacherId = user.uid
              const docRef = doc(db, "All Teachers", teacherId);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setTeacherDatas(docSnap.data());
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

return (
    <div>
      <TeacherData.Provider value={TeacherDatas} >
      <TeacherNavbar />
      <TeacherDashboardHeader />
      </TeacherData.Provider>
      <TeacherBannerData.Provider>
      </TeacherBannerData.Provider>
      <h4>TeacherDashboard</h4>
       
    </div>
  )
}

export default memo(TeacherDashboard)