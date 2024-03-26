import React, { memo, useEffect, useState } from 'react';
import { collection, db, onSnapshot, onAuthStateChanged, auth, doc, getDoc,  query, orderBy } from '../../Config/FirebaseConfig';
import './ClassesShow.css'
import Loader from '../Loader/Loader';  
 
function ClassesShow() {
    const [classData , setClassData] = useState(null)
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
                        const q = query(collection(db, `class${teacherName}`), orderBy("Time", "desc") );
                        // const q = collection(db, `class${teacherName}`);
                        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                            const classes = [];
                            snapshot.forEach((doc) => {
                                classes.push({ id: doc.id, ...doc.data() });
                            });
                            setClassData(classes);
                            setLoading(false);
                        });
                        return () => unsubscribeSnapshot();
                    } else {
                        console.log("No such document!");
                    }
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
                                <video   class="card-img-top custom-card-video" src={item.classes_Video_URL} controls></video>
                            )}
                            {item.type === 'audio' && (
                                    <audio src="" controls></audio>
                            )}
                              <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title">{item.title}</h5>
                                    <button  style={{ width: '30px', height: '30px', borderRadius: '50%', cursor : 'pointer', border : 'none' }} id="dropdownMenuButton" data-bs-toggle="dropdown">
                                        <i className="fa-solid fa-ellipsis-vertical" ></i>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                       <li className="dropdown-item" style={{cursor : 'pointer'}} >Delete</li>
                                    </ul>
                                </div>
                                <p className="card-text">
                                    {showFullDescription[item.id] || item.description.split(' ').length <= 10 ? 
                                        item.description :
                                        truncateDescription(item.description, 10)
                                    }
                                </p>
                                {/* {console.log(item.Time.split(' ')[0])} */}
                                {/* Show more button */}
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

export default memo(ClassesShow);
