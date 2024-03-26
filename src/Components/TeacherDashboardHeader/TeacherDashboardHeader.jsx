import React, { memo, useEffect, useState } from 'react';
import { onAuthStateChanged, auth, collection, onSnapshot, db, doc, getDoc, deleteDoc,} from '../../Config/FirebaseConfig';
import Loader from '../Loader/Loader';

function TeacherDashboardHeader() {
  const [allStudentData, setAllStudentData] = useState([]);
  const [trainerName, setTrainerName] = useState('');
  const [totsllStudent , setTotsllStudent] = useState('')
  const [loading, setLoading] = useState(true);  

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
              console.log()
              const studentsData = [];
              snapshot.forEach((doc) => {
                setTotsllStudent(snapshot.size)
                studentsData.push({ id: doc.id, ...doc.data() });
              });
              setAllStudentData(studentsData);
              setLoading(false); 
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
    {
      loading ? <Loader /> : (
        <>
        <div className="container">
        <h5 className='mt-4 text-capitalize'>{`Total student : ${totsllStudent} student are available`}</h5>
        <div className="row d-flex flex-column">
          {allStudentData.map((student) => (
            <div key={student.id} className="col-lg-6 col-md-12 col-sm-12 m-auto border border-light d-flex justify-content-between p-3 mt-4 rounded main-div">
              <div className="img border d-flex align-items-center" style={{ width: '60px' }}>
                <img className="img-fluid rounded-circle" src={student.Studentimage_url} alt="" />
                <p className="ms-3 text-capitalize fw-semibold fs-5">{student.StudentName}</p>
              </div>
              <div className="dropdown border border-dark d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px', borderRadius: '50%', cursor : 'pointer' }} id="dropdownMenuButton" data-bs-toggle="dropdown">
                <i className="fa-solid fa-ellipsis-vertical" ></i>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li className="dropdown-item" onClick={() => deleteStudent(student.id)} style={{cursor : 'pointer'}} >Eliminate</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
        </>
      )
    }
    </>
  );
}

export default memo(TeacherDashboardHeader);
