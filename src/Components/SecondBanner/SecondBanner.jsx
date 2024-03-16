import React, { memo, useEffect, useState } from 'react';
import './SecondBanner.css'
import { useContext } from 'react';
import { collection, db, onSnapshot  } from '../../Config/FirebaseConfig';
import { TeacherName } from '../../Context/Context';
import { auth, onAuthStateChanged, query, where } from '../../Config/FirebaseConfig';
function SecondBanner() {
  const getData = useContext(TeacherName);
  const [studentImageUrl , setStudentImageUrl ] = useState('');
  const [studentName , setStudentName] = useState('');
   const [loading, setLoading] = useState(false);
   const [allData , setAllData] = useState(false)
   const [uid , setUid] = useState('')
   const [currentStudentName , setCurrentStudentName] = useState('')
   const [ currentStudentImageUrl , setCurrentStudentImageUrl] = useState('')
   const [studentsData , setStudentDatas] = useState('')
  
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      try {
        
        const uid = user.uid
        setUid(uid)
      } catch (error) {
        
      }
    }) 
    const fetchData = async () => {
      try {
        if (!getData) {
      setLoading(true);
          return;
        }
//         const q = query(collection(db, getData), where("StudentId", "==", uid));
//         // const q =  collection(db, getData)StudentName, Studentimage_url
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   // const cities = [];
//   querySnapshot.forEach((doc) => {
//     if(!doc.data().StudentName || !doc.data().Studentimage_url){
//       setAllData(true)
//      }else{
//       console.log(doc.data())
      
//       setCurrentStudentName(doc.data().StudentName)
//       setCurrentStudentImageUrl(doc.data().Studentimage_url)
//     }
//       // cities.push(doc.data());StudentId
//   });
//   // console.log("Current cities in CA: ", cities.join(", "));
// });
// const q = query(collection(db, getData), where("state", "==", "CA"));
const q = query(collection(db, getData), where("StudentId", "==", uid));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      setCurrentStudentName(change.doc.data().StudentName);
      setCurrentStudentImageUrl(change.doc.data().Studentimage_url);
    }
    if (change.type === "modified") {
      setCurrentStudentName(change.doc.data().StudentName);
      setCurrentStudentImageUrl(change.doc.data().Studentimage_url);
    }
    if (change.type === "removed") {
      setCurrentStudentName(change.doc.data().StudentName);
      setCurrentStudentImageUrl(change.doc.data().Studentimage_url);
    }
  });
});
// const q1 = query(collection(db, getData),where("StudentId", "!=", uid));
// const unsubscribes = onSnapshot(q1, (snapshot) => {
//   snapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//       setStudentDatas(change.doc.data());
//       // setStudentDatas(change.doc.data().StudentName);
//       // setStudentImageUrl(change.doc.data().Studentimage_url);
//     }
//     if (change.type === "modified") {
//       setStudentDatas(change.doc.data());
//       // setStudentName(change.doc.data().StudentName);
//       // setStudentImageUrl(change.doc.data().Studentimage_url);
//     }
//     if (change.type === "removed") {
//       setStudentDatas(change.doc.data());
//       // setStudentName(change.doc.data().StudentName);
//       // setStudentImageUrl(change.doc.data().Studentimage_url);
//     }
//   });
// });


const q1 = query(collection(db, getData), where("StudentId", "!=", uid));
const unsubscribes = onSnapshot(q1, (snapshot) => {
  const students = [];
  snapshot.forEach((doc) => {
    students.push(doc.data());
  });
  setStudentDatas(students);
});













    setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, [getData]);
 


  return (
    <div>
      <div className="container">
        <div className="row flex-column">
          {loading ? (
            <div className="justify-content-lg-center justify-content-md-center justify-content-sm-center align-items-lg-center align-items-md-center align-items-sm-center ">
              <p className='text-center fs-3 fw-bold'>Data not found</p>
            </div>
          ) : (
            allData ? (
              <div className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
                <p className='ms-3 text-capitalize fw-semibold fs-4 px-5'>Now you are eliminated</p>
              </div>
            ) : (
              <>
                {!currentStudentName || !currentStudentImageUrl ? (
                  <>
                  <div className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex flex-column align-items-center p-3 mt-4 rounded main-div">
                    <p className='ms-3  text-capitalize fw-bold fs-5'>Now you are Eliminated from this course.</p>
                    <p className='fw-semibold' >If you want to appeared course in IT fields so delete this account and re-registration now</p>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
                      <div className="img" style={{ width: "60px" }}>
                        <img className='img-fluid rounded-circle' src={studentImageUrl} alt="" />
                      </div>
                      <p className='ms-3 text-capitalize fw-semibold fs-5'>{studentName}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
                      <div className="img" style={{ width: "60px" }}>
                        <img className='img-fluid rounded-circle' src={currentStudentImageUrl} alt="" />
                      </div>
                      <p className='ms-3 text-capitalize fw-semibold fs-5'>{currentStudentName}</p>
                    </div>
                    {
                    studentsData.map((data) => {
                      return(
                      <div key={data.StudentId} className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
                      <div className="img" style={{ width: "60px" }}>
                        <img className='img-fluid rounded-circle' src={data.Studentimage_url} alt="" />
                      </div>
                      <p className='ms-3 text-capitalize fw-semibold fs-5'>{data.StudentName}</p>
                    </div>
                      )
                    })
                  }
                    
                  </>
                )}
              </>
            )
          )}
        </div>
      </div>
    </div>
  )
  


  // return (
  //   <div>
  //        <div className="container">
  //                   <div className="row flex-column">
  //                       {
  //                           loading ? (
  //                             <div className="justify-content-lg-center justify-content-md-center justify-content-sm-center align-items-lg-center align-items-md-center align-items-sm-center ">
  //                               <p className='text-center fs-3 fw-bold  ' >Data not found</p>
  //                             </div>
  //                           ) : (
                              
  //                             allData ?
  //                             (
  //                               <>
  //                              <div className="col-lg-6 col-md-12 col-sm-12 m-auto  border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
  //                                   <p className='ms-3 text-capitalize fw-semibold fs-4 px-5'>Now your are eliminated</p>
  //                               </div>    
  //                              </>
  //                             )
  //                               : (
  //                                 <>
  //                                  <div className="col-lg-6 col-md-12 col-sm-12 m-auto  border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
  //                               <div className="img" style={{width : "60px"}} >
  //                                   <img className='img-fluid rounded-circle' src={currentStudentImageUrl  && "" } alt="" />
  //                               </div>
  //                               <p className='ms-3 text-capitalize fw-semibold fs-5'>{currentStudentName ? currentStudentName :  "Now your are Eliminated this course" }</p>
  //                           </div>
  //                               <div className="col-lg-6 col-md-12 col-sm-12 m-auto  border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
  //                               <div className="img" style={{width : "60px"}} >
  //                                   <img className='img-fluid rounded-circle' src={studentImageUrl} alt="" />
  //                               </div>
  //                               <p className='ms-3 text-capitalize fw-semibold fs-5'>{studentName}</p>
  //                           </div>
  //                                 </>
  //                             )
  //                           )
  //                       }
                        
  //                   </div>
  //               </div>
  //   </div>
  // )
}

export default memo(SecondBanner);