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
  );
}

export default memo(TeacherDashboardHeader);
