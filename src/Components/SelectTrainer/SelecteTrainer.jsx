import React, { memo, useEffect, useState } from 'react';
import './SelectedTrainer.css'
import {
  onSnapshot,
  collection,
  query,
  db,
  doc,
  onAuthStateChanged,
  auth,
  where,
  setDoc,
  getDoc,
   addDoc
} from '../../Config/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

 function SelecteTrainer() {
  const [userId, setUserId] = useState('');
  const [course, setCourse] = useState('');
  const [teacherData, setTeacherData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [savingData, setSavingData] = useState(false); // Add savingData state
  const [studentName, setStudentName] = useState('')
  const [studentCourse, setStudentCourse] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [studentimage_url, setStudentimage_url] = useState('')
  const [studentId, setStudentId] = useState('')

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      }
    });

    return () => {
      unsubscribeAuth(); // Cleanup the auth subscription
    };
  }, []);

  useEffect(() => {
    let unsubscribeSnapshot;

    const fetchData = async () => {
      setLoadingData(true);

      if (userId) {
        const userDocRef = doc(db, 'All Students', userId);

        unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setStudentId(doc.id)
            console.log(doc.id)
            setStudentName(doc.data().Name)
            setStudentEmail(doc.data().Email)
            setStudentCourse(doc.data().Courses)
            setStudentimage_url(doc.data().image_URL)
            const userCourses = doc.data().Courses;

            if (userCourses) {
              setCourse(userCourses);

              const teachersRef = collection(db, 'All Teachers');
              const teachersQuery = query(teachersRef, where('Courses', '==', userCourses));

              unsubscribeSnapshot = onSnapshot(teachersQuery, (snapshot) => {
                if (!snapshot.empty) {
                  setTeacherData(snapshot.docs.map((doc) => doc));
                } else {
                  setTeacherData([]);
                }

                setLoadingData(false);
              });
            } else {
              setLoadingData(false);
            }
          } else {
            setLoadingData(false);
          }
        });
      }
    };

    fetchData();

    return () => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();  
      }
    };
  }, [userId]);
  const navigate = useNavigate()
const data = async (id) => {
    try {
      // setSavingData(true);
      setSavingData(true)
      const teacherDoc = await getDoc(doc(db, "All Teachers", id));
      await setDoc(doc(db, teacherDoc.data().Name, userId), {
        TeacherName: teacherDoc.data().Name,
        StudentName: studentName,
        Days: teacherDoc.data().Days,
        Timming: teacherDoc.data().Timming,
        StudentCourse: studentCourse,
        StudentEmail: studentEmail,
        Studentimage_url: studentimage_url,
        StudentId: studentId,
      });
      await setDoc(doc(db, studentId, userId), {
        TeacherName: teacherDoc.data().Name,
        StudentName: studentName,
        Days: teacherDoc.data().Days,
        Timming: teacherDoc.data().Timming,
        StudentCourse: studentCourse,
        StudentEmail: studentEmail,
        Studentimage_url: studentimage_url,
        StudentId: studentId,
        TeacherId : id
      });
      setSavingData(false);
      navigate('/student dashboard');   
    } catch (error) {
      console.error("Error adding document: ", error);
      setSavingData(false);
    }
  };

  return (
    <div>
      {loadingData  || savingData ?  (
        <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : (
        <>
          <h3 className='text-center my-4'>SelecteTrainer</h3>
           <div className="container">
            <div className="row " style={{gap : 5}}>
                {
                    teacherData.map((teacher, index) => (
                    <div className="col-lg-4 col-md-12 col-sm-12 mt-4 bg-color rounded py-3 px-2" key={index} onClick={()=>{data(teacher.id)}} >
                    <p>Name : Sir {teacher.data().Name}</p>
                    <p>Cousre : {teacher.data().Courses}</p>
                    <div className="d-flex justify-content-between pe-4">
                    <p>Timming : {teacher.data().Timming}</p>
                    <p>Days : {teacher.data().Days}</p>
                    </div>
                    </div> 
                    ))
                }
            </div>
           </div>
        </>
      )}
    </div>
  );
}


export default memo(SelecteTrainer)


