import React, { memo, useEffect, useState } from 'react';
import { collection, db, onSnapshot,getDocs ,  onAuthStateChanged, auth, doc, getDoc,  query, orderBy } from '../../Config/FirebaseConfig';
import './StudentClassShow.css'
import Loader from '../Loader/Loader';  
 
function StudentClasses() {
    const [classData , setClassData] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
             if (user) {
                try {
                    const teacherId = user.uid;
                    const docRef = doc(db, "All Teachers", teacherId);
                    const querySnapshot = await getDocs(collection(db, user.uid));
                    querySnapshot.forEach((doc) => {
                       let teacherName = doc.data().TeacherName
                      const q = query(collection(db, `class${teacherName}`), orderBy("Time", "desc") );
                         const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                            const classes = [];
                            snapshot.forEach((doc) => {
                                classes.push({ id: doc.id, ...doc.data() });
                            });
                            setClassData(classes);
                            setLoading(false);
                        });
                        return () => unsubscribeSnapshot();
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }, []);

    const truncateDescription = (description, wordCount) => {
        const words = description.split(' ');
        if (words.length > wordCount) {
            return words.slice(0, wordCount).join(' ') + '...';
        } else {
            return description;
        }
    };

    const [showFullDescription, setShowFullDescription] = useState({});

    const handleShowMore = (itemId) => {
        setShowFullDescription(prevState => ({
            ...prevState,
            [itemId]: true
        }));
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mt-5">
            <div className="row card-container">
               {classData && classData.map((item) => (
                    <div className="col-lg-3 col-md-4 col-sm-12 " key={item.id}>
                        <div className="card" style={{ width: "18rem" , height : "350px" }}>
                            {item.image_status === true && (
                                <img src={item.classes_Image_URL} className="card-img-top custom-card-img "    alt="Image" />
                            )}
                            {item.video_status === true && (
                                <video   claclassNamess="card-img-top custom-card-video" src={item.classes_Video_URL} controls></video>
                            )}
                            {item.type === 'audio' && (
                                    <audio src="" controls></audio>
                            )}
                              <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">
                                    {showFullDescription[item.id] || item.description.split(' ').length <= 10 ? 
                                        item.description :
                                        truncateDescription(item.description, 10)
                                    }
                                </p>
                                {!showFullDescription[item.id] && item.description.split(' ').length > 10 &&
                                    <button onClick={() => handleShowMore(item.id)}>Show More</button>
                                }
                                <div className="d-flex justify-content-between">
                                    <p className='ms-auto'> uploaded time: {item.Time.split(' ')[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>  
                ))}  
            </div>
        </div>
    );
}

export default memo(StudentClasses);
