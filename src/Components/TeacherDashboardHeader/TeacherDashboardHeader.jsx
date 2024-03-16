// import React, { memo, useEffect, useState } from 'react'
// import { onAuthStateChanged, auth, collection, onSnapshot, db, doc, getDoc, deleteDoc  } from '../../Config/FirebaseConfig';
// import { useContext } from 'react';
// import { TeacherData } from '../../Context/Context';
// function TeacherDashboardHeader() {
//   const [allStudentData , setAllStudentData] = useState("")
//   const [studentId , setStudentId] = useState('')
//   const[trainerName , setTrainerName] = useState('')


//   useEffect(()=>{
//     onAuthStateChanged(auth,async (user) => {
//       if (user) {
//         try {
//           const teacherId = user.uid
//           const docRef = doc(db, "All Teachers", teacherId);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             let teacherName = docSnap.data().Name
//             setTrainerName(teacherName)
//             console.log()
//             const q =  collection(db, teacherName) 
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//               snapshot.docChanges().forEach((change) => {
//                 if (change.type === "added") {
//                     setAllStudentData(change.doc.data());
//                     setStudentId(change.doc.id);
//                     console.log(change.doc.data());
//                 }
//                 if (change.type === "modified") {
//                     setAllStudentData(change.doc.data());
//                 }
//                 if (change.type === "removed") {
//                     setAllStudentData(change.doc.data());
//                 }
//               });
//             });
//           } else {
//             console.log("No such document!");
//           }        
//       } catch (error) {
//         console.log(error)
          
//       }
//         } else {
//        }
//     });
//   },[])
  
//   const getData = useContext(TeacherData)
//   if(!getData){
//     return <p className='text-center fs-4 ' >Loading ...</p>
//   }
//   let elimenate = async()=>{
//     try {
//       // console.log("trainer Name ", trainerName)
//       await deleteDoc(doc(db, trainerName, studentId));    
//       console.log('delete successfully')  
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <>
//     <div class="container">
//     <div class="row">
//         <div class="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex justify-content-between p-3 mt-4 rounded main-div">
//             <div class="img border d-flex align-items-center" style={{width: '60px'}} >
//                 <img class="img-fluid rounded-circle" src={allStudentData.Studentimage_url}  alt="" />
//                 <p class="ms-3 text-capitalize fw-semibold fs-5">{allStudentData.StudentName}</p>
//             </div>
//             <div class="dropdown border border-dark d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px', borderRadius : '50%'}} id="dropdownMenuButton" data-bs-toggle="dropdown">
//                 <i class="fa-solid fa-ellipsis-vertical"></i>                 
//                 <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                   <li className='dropdown-item' onClick={() => elimenate()}>Elimenate</li>
//                 </ul>
//             </div>
//         </div>
//     </div>
// </div>

//     {/* <div className="container">
//     <div className="row">
//         <div className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex justify-content-between p-3 mt-4 rounded main-div">
//             <div className="img border d-flex align-items-center" style={{width : "60px"}} >
//                 <img className='img-fluid rounded-circle ' src={allStudentData.Studentimage_url} alt="" />
//                 <p className='ms-3 text-capitalize fw-semibold fs-5'>{allStudentData.StudentName}</p>
//             </div>
//             <div className='border border-dark d-flex align-items-center justify-content-center ' style={{width : '30px' , height : '30px',  borderRadius : '50%'}}>
//                 <i class="fa-solid fa-ellipsis-vertical"></i>
//             </div>
//         </div>
//     </div>
// </div> */}

//       {/* <div className="container">
//         <div className="row">
//           <div className="col-lg-6 col-md-12 col-sm-12 m-auto  border border-light d-flex  justify-content-between p-3 mt-4 rounded main-div">
//             <div className="img border d-flex align-items-center" style={{width : "60px"}} >
//               <img className='img-fluid rounded-circle ' src={allStudentData.Studentimage_url} alt="" />
//               <p className='ms-3 text-capitalize fw-semibold fs-5'>{allStudentData.StudentName}</p>
//             </div>
//             <div className='border border-dark justify-content-center' style={{width : '20px' , height : '20px' , borderRadius : "50%"}}>
//             <i class="fa-solid fa-ellipsis-vertical"></i>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     </>
//   )
//   // Studentimage_url
// }

// export default memo(TeacherDashboardHeader)


import React, { memo, useEffect, useState } from 'react';
import { onAuthStateChanged, auth, collection, onSnapshot, db, doc, getDoc, deleteDoc, deleteUser  } from '../../Config/FirebaseConfig';
import { useContext } from 'react';
import { TeacherData } from '../../Context/Context';

function TeacherDashboardHeader() {
  const [allStudentData, setAllStudentData] = useState([]);
  const [trainerName, setTrainerName] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const teacherId = user.uid;
          const docRef = doc(db, "All Teachers", teacherId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            let teacherName = docSnap.data().Name;
            setTrainerName(teacherName);
            const q = collection(db, teacherName);
            const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
              const studentsData = [];
              snapshot.forEach((doc) => {
                studentsData.push({ id: doc.id, ...doc.data() });
              });
              setAllStudentData(studentsData);
            });
            return () => unsubscribeSnapshot();
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const getData = useContext(TeacherData);
  if (!getData) {
    return <p className='text-center fs-4'>Loading ...</p>;
  }

  const deleteStudent =async (studentId) => {
    try {
      await deleteDoc(doc(db, trainerName, studentId));
      // await deleteDoc(doc(db, "All Students", studentId));
      // await deleteDoc(doc(db, studentId, studentId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex flex-column">
          {allStudentData.map((student) => (
            <div key={student.id} className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex justify-content-between p-3 mt-4 rounded main-div">
              <div className="img border d-flex align-items-center" style={{ width: '60px' }}>
                <img className="img-fluid rounded-circle" src={student.Studentimage_url} alt="" />
                <p className="ms-3 text-capitalize fw-semibold fs-5">{student.StudentName}</p>
              </div>
              <div className="dropdown border border-dark d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', borderRadius: '50%' }} id="dropdownMenuButton" data-bs-toggle="dropdown">
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li className="dropdown-item" onClick={() => deleteStudent(student.id)}>Delete</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default memo(TeacherDashboardHeader);
