import React, {useEffect} from 'react'
import { auth, onAuthStateChanged } from '../../Config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
    const navigate = useNavigate()
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
           } else {
            navigate('/')
          }
        });
      },[])
  return (
    <div>TeacherDashboard</div>
  )
}

export default TeacherDashboard