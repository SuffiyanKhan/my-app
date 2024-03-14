// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { db, onSnapshot, doc, onAuthStateChanged, auth,getDocs, collection } from '../../Config/FirebaseConfig';
// import StudentNavbar from '../StudentNavbar/StudentNavbar';
// import AppNavbar from '../Navbar/Navbar';
// import FirstBanner from '../FirstBanner/FirstBanner';
// import { Spin } from 'antd';
// export default function StudentDhsboard() {
//   let [userId , setUserId] = useState('');
//   let [trainerName , setTrainerName] =useState('')
//   let [loader , setLoader] = useState( true)
//   let getData = async()=>{
//     const querySnapshot = await getDocs(collection(db, userId));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   setLoader(false)
//   console.log(doc.id, " => ", doc.data());
//   console.log(doc.id, " => ", doc.data());
//   setTrainerName(doc.id, " => ", doc.data().TeacherName);
// });

//     // const querySnapshot = await getDocs(collection(db, userId));
//     // querySnapshot.forEach((doc) => {
//     //   // doc.data() is never undefined for query doc snapshots
//     //   console.log(doc.id, " => ", doc.data());
//     //   console.log(doc.id, " => ", doc.data().TeacherName);
//     //   // TeacherName, Studentimage_url, StudentName , StudentEmail, StudentCourse, Days
//     // });
//   }
//   useEffect(()=>{
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         setUserId(uid)
//         console.log(uid)
//       } else {
//       }
//     });
    

//     // const unsub = onSnapshot(
//     //   doc(db, "cities", "SF"), 
//     //   // { includeMetadataChanges: true }, 
//     //   (doc) => {
//     //     console.log(doc)
//     //     // ...
//     //   });
//     if(userId){
//     getData()
//     }else{
       
//         <Spin />
     
//     }
//   },[])
  
  
//   const navigate = useNavigate()
//   let logout =()=> {
//     auth.signOut().then(() => {
//       navigate('/')
//     })
//   }
//   return (
//     <div>
//       <AppNavbar/>
//       {
//         loader ? <FirstBanner data={trainerName}/> : "loading ..."
//       }
      
//       {/* <StudentNavbar /> */}
//       StudentDhsboard
//       <button onClick={logout}>Log out</button>
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, onAuthStateChanged, auth, getDocs, collection } from '../../Config/FirebaseConfig';
import AppNavbar from '../Navbar/Navbar';
import FirstBanner from '../FirstBanner/FirstBanner';
import { Spin } from 'antd';
import { studentData } from '../../Context/Context';
import { TeacherName } from '../../Context/Context';
import SecondBanner from '../SecondBanner/SecondBanner';
 

export default function StudentDhsboard() {
  const [userId, setUserId] = useState('');
  const [loader, setLoader] = useState(true);
  const [trainerName, setTrainerName] = useState('');
  const [Course , setCourse] = useState('');
  const [Days ,  setDays] = useState('');
  const [timing , setTiming] = useState('')

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, userId));
      querySnapshot.forEach((doc) => {
        setTrainerName(doc.data().TeacherName);
        setCourse(doc.data().StudentCourse)
        if(doc.data().Days === "MWF"){
          setDays("Monday, Wednesday, Friday")
        }else if(doc.data().Days === "TTS"){
          setDays("Tuesday, Thursday, Saturday")
        }else if(doc.data().Days === "week end only"){
          setDays("only sunday")
        }else if(doc.data().Days === "All"){
          setDays(" Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday")
        }
        setTiming(doc.data().Timming)
    // TeacherName, Studentimage_url, StudentName , StudentEmail, StudentCourse, Days

      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        console.log(uid);
      }
    });

    if (userId) {
      getData();
    }

    return () => {
      unsubscribe(); // Cleanup the subscription on component unmount
    };
  }, [userId]);

  const navigate = useNavigate();

  
  const datas ={
    TeacherName : trainerName,
    CourseName : Course,
    Days : Days,
    Timing : timing
  }

  return (
    <div>
      <AppNavbar />
      <studentData.Provider value={datas}>
      {loader ? <div className='spiners' style={{width: "100%", height : "100vh", display :"flex" , justifyContent :'center' , alignItems : 'center'}}> <Spin /></div> : <FirstBanner/>}
      </studentData.Provider>
      <TeacherName.Provider value={trainerName}>
      <SecondBanner/>
      </TeacherName.Provider>
      {/* StudentDhsboard
      <button onClick={logout}>Log out</button> 03193856368 */}
    </div>
  );
}
