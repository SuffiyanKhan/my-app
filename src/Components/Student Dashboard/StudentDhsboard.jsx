// import React, { useEffect, useState } from 'react'
// import { auth, onAuthStateChanged, deleteDoc, doc, db, deleteUser } from '../../Config/FirebaseConfig';
// import Swal from 'sweetalert2'
// import { useNavigate } from 'react-router-dom';
// import AppNavbar from '../Navbar/Navbar';


// export default function StudentDhsboard() {
//   let [userId , setUserId] = useState('')
//   useEffect(()=>{
//    onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//         setUserId(uid)
//         // ...
//       } else {
//         // User is signed out
//         // ...
//       }
//     });
//   },[])
//   const navigate = useNavigate()
//    let logout =async()=> {
//     //  await deleteDoc(doc(db, "All Students", userId));
//     //  console.log('successfully')
//     //  deleteUser(auth.currentUser).then(() => {
//     //  navigate('/')
//       // console.log('successfully')
//        // User deleted.
//     //  }).catch((error) => {
//       // console.log('Error')
//        // An error ocurred
//        // ...
//     //  });
//     // console.log('hi')
//    }
//   return (
//     <div>
//       <AppNavbar/>
//       {/* <h2 className='mt-5 ms-5' >Lerning Managment System</h2> */}
      
//       {/* <button className='btn btn-dark mt-5 ms-5' onClick={logout} >logout</button> */}
//     </div>
//   )
// }

// import { useState } from 'react';
// import { initializeApp } from 'firebase/app';
// import {   collection, query, where, getDocs,  addDoc ,db } from '../../Config/FirebaseConfig';

  

// function StudentDhsboard() {
//   const [studentData, setStudentData] = useState({
//     name: 'John Doe',
//     course: 'web design',
//     // Add other student fields as needed
//   });

//   const handleCheckTeacher = async () => {
//     try {
//       // Add student to the 'students' collection
//       const studentsCollectionRef = collection(db, 'students');
//       const docRef = await addDoc(studentsCollectionRef, studentData);

//       // Query teachers collection for the selected course
//       const teachersCollectionRef = collection(db, 'teachers');
//       const q = query(teachersCollectionRef, where('courses', "==" , studentData.course));
//       const querySnapshot = await getDocs(q);
//       // console.log(querySnapshot)
//       if (querySnapshot.empty) {
//         console.log('Teacher not found for the selected course');
//       } else {
//       //   console.log('Teacher found for the selected course. Details:');
//         querySnapshot.forEach((doc) => {
//           // console.log('Teacher Name:', doc.data().name);
//           console.log('Teacher Courses:', doc.data().course);
//           // Add other teacher details as needed
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Firebase v10 React Example</h1>
//       <button onClick={handleCheckTeacher}>Check Teacher</button>
//     </div>
//   );
// }

// export default StudentDhsboard;
import React from 'react'

export default function StudentDhsboard() {
  return (
    <div>StudentDhsboard</div>
  )
}

