import React, { memo, useEffect, useState } from 'react';
import { db, onAuthStateChanged, auth, getDocs, collection } from '../../Config/FirebaseConfig';
import AppNavbar from '../Navbar/Navbar';
import FirstBanner from '../FirstBanner/FirstBanner';
import { Spin } from 'antd';
import { studentData } from '../../Context/Context';
import { TeacherName } from '../../Context/Context';
import SecondBanner from '../SecondBanner/SecondBanner';
 
function StudentDhsboard() {
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
        if(!doc){
          alert('Data not yet')
        }else if(!doc.data()){
          alert('data not yet')
        }else{
          console.log(doc.data())
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
        }
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
      }
    });
    if (userId) {
      getData();
    }
    return () => {
      unsubscribe();
    };
  }, [userId]);
  if(trainerName === "" || Course === "" || Days === "" || timing === ""){
  }
  const datas ={
    TeacherName : trainerName,
    CourseName : Course,
    Days : Days,
    Timing : timing
  }
  return (
    <div>
      <studentData.Provider value={datas}>
      <AppNavbar />
      {loader ? <div className='spiners' style={{width: "100%", height : "100vh", display :"flex" , justifyContent :'center' , alignItems : 'center'}}> <Spin /></div> : <FirstBanner/>}
      </studentData.Provider>
      <TeacherName.Provider value={trainerName}>
      <SecondBanner/>
      </TeacherName.Provider>
    </div>
  );
}

export default memo(StudentDhsboard)