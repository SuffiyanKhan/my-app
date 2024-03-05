import React from 'react'
import { auth } from '../../Config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
export default function StudentDhsboard() {
  const navigate = useNavigate()
  let logout =()=> {
    auth.signOut().then(() => {
      navigate('/')
    })
  }
  return (
    <div>StudentDhsboard
      <button onClick={logout}>Log out</button>
    </div>
  )
}

