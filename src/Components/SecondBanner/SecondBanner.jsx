import React, { useEffect, useState } from 'react';
import './SecondBanner.css'
import { useContext } from 'react';
import { getDocs, collection, db, onSnapshot  } from '../../Config/FirebaseConfig';
import { TeacherName } from '../../Context/Context';
import { Spin } from 'antd';

function SecondBanner() {
  const getData = useContext(TeacherName);
  const [studentImageUrl , setStudentImageUrl ] = useState('');
  const [studentName , setStudentName] = useState('');
  const [studentEmail , setStudentEmail] = useState('')
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!getData) {
          setLoading(true);
          return;
        }    
const unsubscribe = onSnapshot(collection(db, getData),(snapshot) => {
         snapshot.docChanges().map(data => {
            console.log(data.doc.data())
            setStudentImageUrl(data.doc.data().Studentimage_url)
            setStudentName(data.doc.data().StudentName)
         })
      // ...
    },
    (error) => {
      // ...
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
                        {
                            loading ? "Loading ..." : (
                                <div className="col-lg-6 col-md-12 col-sm-12 m-auto  border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
                                    <div className="img" style={{width : "60px"}} >
                                        <img className='img-fluid rounded-circle' src={studentImageUrl} alt="" />
                                    </div>
                                    <p className='ms-3 text-capitalize fw-semibold fs-5'>{studentName}</p>
                                </div>  
                            )
                        }
                        
                    </div>
                </div>
    </div>
  )
}

export default SecondBanner;

// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================
// =============================================


// import React, { useEffect, useState } from 'react';
// import './SecondBanner.css';
// import { useContext } from 'react';
// import { getDocs, collection, db, onSnapshot } from '../../Config/FirebaseConfig';
// import { TeacherName } from '../../Context/Context';
// import { Spin } from 'antd';

// function SecondBanner() {
//   const getData = useContext(TeacherName);
//   const [studentImageUrl, setStudentImageUrl] = useState('');
//   const [studentName, setStudentName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [counter, setCounter] = useState(0); // Initialize the counter state

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!getData) {
//           setLoading(true);
//           return;
//         }
        
//         const unsubscribe = onSnapshot(collection(db, getData), (snapshot) => {
//           snapshot.docChanges().map((data) => {
//             console.log(data.doc.data());
//             setStudentImageUrl(data.doc.data().Studentimage_url);
//             setStudentName(data.doc.data().StudentName);
//             // Increment the counter when new data is added
//             setCounter((prevCounter) => prevCounter + 1);
//           });
//         },
//         (error) => {
//           // Handle error
//         });

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(true);
//       }
//     };

//     fetchData();

//     // Cleanup function to unsubscribe from snapshot listener
//     // return () => unsubscribe(); 
//   }, [getData]);

//   // Implement a function to handle logout
//   const handleLogout = () => {
//     // Decrement the counter when a user logs out
//     setCounter((prevCounter) => Math.max(0, prevCounter - 1));
//     // Add your logout logic here
//   };

//   return (
//     <div>
//       {loading ? (
//         <Spin />
//       ) : (
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex align-items-center p-3 mt-4 rounded main-div">
//               <div className="img" style={{ width: "60px" }}>
//                 <img className="img-fluid rounded-circle" style={{ width: "60px" }} src={studentImageUrl} alt="" />
//               </div>
//               <p className="ms-3 text-capitalize fw-semibold fs-5">{studentName}</p>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           </div>
//           <p>Total Students: {counter}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SecondBanner;
