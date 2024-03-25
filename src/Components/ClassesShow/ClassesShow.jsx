// import React, { useEffect, useState } from 'react'
// import {collection, db , onSnapshot,  onAuthStateChanged, auth, doc ,  getDoc} from '../../Config/FirebaseConfig'
// import image from '../Images/Student dashboard images/laptop-5673901_640.jpg'
// function ClassesShow() {
//     const [classCollectionName , setClassCollectionName] = useState('')
//     useEffect(() => {
//         const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//               try {
//                 const teacherId = user.uid;
//                 const docRef = doc(db, "All Teachers", teacherId);
//                 const docSnap = await getDoc(docRef);
//                 if (docSnap.exists()) {
//                   let teacherName = docSnap.data().Name;
//                   setClassCollectionName(teacherName);
//                 //   const q = collection(db, `class${teacherName}`);
//                 //   const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
//                 //     // setTotsllStudent(snapshot.size)
//                 //     const classes = [];
//                 //     snapshot.forEach((doc) => {
//                 //       classes.push({ id: doc.id, ...doc.data() });
//                 //     });
//                 //     console.log(classes)
//                 //     // setAllStudentData(studentsData);
//                 //   });
//                 //   return () => unsubscribeSnapshot();
//                 } else {
//                   console.log("No such document!");
//                 }
//               } catch (error) {
//                 console.log(error);
//               }
//             } else {
//             }
//           });
  

//     },[])

//     let fetchData =()=>{
//         // console.log(classCollectionName)
//           const q = collection(db, `class${classCollectionName}`);
//           const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
//             // setTotsllStudent(snapshot.size)
//           const classes = [];
//           snapshot.forEach((doc) => {
//           classes.push({ id: doc.id, ...doc.data() });
//           });
//           console.log(classes)
//                     // setAllStudentData(studentsData);
//           });
//     }
//     fetchData()



//   return (
//     <>
//         <div className="container">
//             <div className="row">
//                 <div className="col-lg-3 col-md-4 col-sm-12">
//                     <div class="card" style={{width : "18rem"}}>
//                         <img src={image} class="card-img-top" alt="..." />
//                             <div class="card-body">
//                                 <h5 class="card-title">Card title</h5>
//                                 <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                                 <div className="d-flex justify-content-between ">
//                                     <p className='ms-auto' > upload : 14:20 pm</p>
//                                 </div>
//                             </div>
//                     </div>    
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default ClassesShow
// // import React, { useState, useEffect } from 'react';
// // import image from '../Images/Student dashboard images/laptop-5673901_640.jpg';

// // function ClassesShow() {
// //     const [posts, setPosts] = useState([]);
// //     const [description, setDescription] = useState('');

// //     const handleSubmit = (event) => {
// //         event.preventDefault();
// //         const currentTime = new Date().toLocaleTimeString();
// //         const newPost = {
// //             description: description,
// //             uploadTime: currentTime
// //         };
// //         // Assuming you have a function to save data to the database
// //         // saveDataToDatabase(newPost); // You need to implement this function
// //         setPosts([...posts, newPost]);
// //         setDescription('');
// //     };

// //     return (
// //         <>
// //             <div className="container">
// //                 <div className="row">
// //                     <div className="col-lg-3 col-md-4 col-sm-12">
// //                         <form onSubmit={handleSubmit}>
// //                             <div className="card" style={{ width: "18rem" }}>
// //                                 <img src={image} className="card-img-top" alt="..." />
// //                                 <div className="card-body">
// //                                     <h5 className="card-title">Card title</h5>
// //                                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
// //                                     <div className="d-flex justify-content-between ">
// //                                         <button type="submit" className="btn btn-primary">Post</button>
// //                                     </div>
// //                                     <textarea
// //                                         className="form-control mt-3"
// //                                         value={description}
// //                                         onChange={(e) => setDescription(e.target.value)}
// //                                         placeholder="Enter post description..."
// //                                     />
// //                                 </div>
// //                             </div>
// //                         </form>
// //                     </div>
// //                     <div className="col-lg-9 col-md-8 col-sm-12">
// //                         {posts.map((post, index) => (
// //                             <div key={index} className="card mb-3">
// //                                 <div className="card-body">
// //                                     <h5 className="card-title">Post {index + 1}</h5>
// //                                     <p className="card-text">{post.description}</p>
// //                                     <p className="card-text">Upload Time: {post.uploadTime}</p>
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }

// // export default ClassesShow;









// import React, { memo, useEffect, useState } from 'react';
// import { collection, db, onSnapshot, onAuthStateChanged, auth, doc, getDoc } from '../../Config/FirebaseConfig';
// import './ClassesShow.css'
// import Loader from '../Loader/Loader';  
// import image from '../Images/Student dashboard images/laptop-5673901_640.jpg';

// function ClassesShow() {
//     const [classData , setClassData] = useState(null)
//     // const [classData, setClassData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 try {
//                     const teacherId = user.uid;
//                     const docRef = doc(db, "All Teachers", teacherId);
//                     const docSnap = await getDoc(docRef);
//                     if (docSnap.exists()) {
//                         let teacherName = docSnap.data().Name;
//                         const q = collection(db, `class${teacherName}`);
//                         const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
//                             const classes = [];
//                             snapshot.forEach((doc) => {
//                                 classes.push({ id: doc.id, ...doc.data() });
//                             });
//                             setClassData(classes);
//                             setLoading(false);
//                         });
//                         return () => unsubscribeSnapshot();
//                     } else {
//                         console.log("No such document!");
//                     }
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
//         });
//     }, []);

//     if (loading) {
//         return <Loader />;
//     }

    

//     return (
//         <div className="container">
//             <div className="row card-container">
//                {classData && classData.map((item) => (
//                     <div className="col-lg-3 col-md-4 col-sm-12 " key={item.id}>
//                         <div className="card" style={{ width: "18rem" , height : "350px" }}>
//                             {

//                             // console.log(item)
//                             }
//                             {item.image_status === true && (
//                                 <img src={item.classes_Image_URL} className="card-img-top custom-card-img "    alt="Image" />
//                             )}
//                             {item.video_status === true && (
//                                 <video   class="card-img-top custom-card-video" src={item.classes_Video_URL} controls></video>
                                
//                             )}
//                             {item.type === 'audio' && (
//                                     <audio src="" controls></audio>
//                                 // <AudioPlayer src={item.url} />
//                             )}
//                             {
//                                 console.log(item.Time)
//                             }
//                               <div className="card-body">
//                                 <h5 className="card-title">{item.title}</h5>
//                                 <p className="card-text">{item.description}</p>                
//                                 <div className="d-flex justify-content-between">
//                                     <p className='ms-auto'>Upload: {item.uploadTime}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>  
                    
//                 ))}  
//             </div>
//         </div>
//     );
// }

// export default memo(ClassesShow);













import React, { memo, useEffect, useState } from 'react';
import { collection, db, onSnapshot, onAuthStateChanged, auth, doc, getDoc,  query, orderBy } from '../../Config/FirebaseConfig';
import './ClassesShow.css'
import Loader from '../Loader/Loader';  
import image from '../Images/Student dashboard images/laptop-5673901_640.jpg';

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
                                <div className="">
                                    <h5 className="card-title">{item.title}</h5>
                                    <button></button>
                                </div>
                                <p className="card-text">
                                    {showFullDescription[item.id] || item.description.split(' ').length <= 10 ? 
                                        item.description :
                                        truncateDescription(item.description, 10)
                                    }
                                </p>
                                {console.log(item.Time.split(' ')[0])}
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
