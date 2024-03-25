import React, { useState  ,useEffect } from 'react'
import './Classes.css'
import ClassesShow from '../ClassesShow/ClassesShow';
import {storage, ref, uploadBytesResumable, getDownloadURL,onAuthStateChanged, auth, doc, db, getDoc,collection, addDoc, onSnapshot } from '../../Config/FirebaseConfig'
function Classes() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [classesImageUrl , setClassesImageUrl] = useState('')
  const [classeImageUrl , setClasseImageUrl] = useState( false)
  const [classesVideoUrl , setClassesVideoUrl] = useState('')
  const [classeVideoUrl , setClasseVideoUrl] = useState(false)
  const [classesAudioUrl , setClassesAudioUrl] = useState('')
  const [classeAudioUrl , setClasseAudioUrl] = useState(false)
  const [imageSave , setImageSave] = useState(false);
  const [teacherName , setTeacherName] = useState('')
  const [uploadClass , setUploadClass] = useState(false)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const teacherId = user.uid;
          const docRef = doc(db, "All Teachers", teacherId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            let teacherName = docSnap.data().Name;
            setTeacherName(teacherName);
            // const q = collection(db, teacherName);
            // const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
            //   setTotsllStudent(snapshot.size)
            //   const studentsData = [];
            //   snapshot.forEach((doc) => {
            //     studentsData.push({ id: doc.id, ...doc.data() });
            //   });
            //   setAllStudentData(studentsData);
            // });
            // return () => unsubscribeSnapshot();
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
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  let obj = {
    classes_Image_URL : classesImageUrl,
    classes_Video_URL : classesVideoUrl,
    classes_Audio_URL : classesAudioUrl,
    image_status : classeImageUrl,
    video_status : classeVideoUrl,
    audio_status : classeAudioUrl,
    description : description ,
    title : title,
    Time : new Date().toTimeString()
  }
  // console.log(new Date().toTimeString())
  let upload =() => {
    // console.log(file.type.startsWith('image/'))
    if(file.type.startsWith('image/')){
      const mountainImagesRef = ref(storage, `classes/imageClass/${file.name}`);
      const uploadTask = uploadBytesResumable(mountainImagesRef, file);
   uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress)
       switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
         setImageSave(true)
           console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      alert("try again")
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageSave(false)
        setClassesImageUrl(downloadURL)
        setClasseImageUrl(true)
      })
    }
    );
    }else if(file.type.startsWith('video/')){
      const mountainImagesRef = ref(storage, `classes/videoClass/${file.name}`);
      const uploadTask = uploadBytesResumable(mountainImagesRef, file);
   uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress)
       switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
         setImageSave(true)
           console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      alert("try again")
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageSave(false)
        setClassesVideoUrl(downloadURL)
        setClasseVideoUrl(true)
      })
    }
    );
    }else if(file.type.startsWith('audio/')){
      const mountainImagesRef = ref(storage, `classes/audioClass/${file.name}`);
      const uploadTask = uploadBytesResumable(mountainImagesRef, file);
   uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress)
       switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
         setImageSave(true)
           console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      alert("try again")
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageSave(false)
        setClassesAudioUrl(downloadURL)
        setClasseAudioUrl(true)
      })
    }
    )      
    }
  }

  let addClasses = () => {
    setUploadClass(true)
    uploadClasses(obj)
  }

  let uploadClasses = async (data) => {
    const docRef = await addDoc(collection(db, `class${teacherName}`), {
      ...data
    });
    setUploadClass(false)
    console.log("Document written with ID: ", docRef.id);
    
    // console.log({...data})
  }
  return (
    <>
    <section>
      <div className="container">
        <div className="row mt-3">
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className='text-capitalize'>Total Classes : </h5>
              <div>
              <button className='btn btn-light' data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-plus"></i> Add Class</button>
              </div>
              <div
  className="modal fade"
  id="exampleModal"
  tabIndex={-1}
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5 text-capitalize" id="exampleModalLabel">
          Add Class
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div className="modal-body"> 
      <div>
        <p className='text-capitalize fw-semibold'>Title</p>
        <input
          className='form-control'
          placeholder='Title'
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className='mt-3'>
        <p className='text-capitalize fw-semibold'>Description (optional)</p>
        <input
          className='form-control'
          placeholder='Description'
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className='mt-4'>
        <div className="mb-3">
          <input type="file" onChange={handleFileChange} required />
          {/* imageSave */}
          {/* <i className="fa-solid fa-upload"></i> Upload file */}
          <button className='btn btn-primary'onClick={upload}>
            {
              imageSave ? "Loading ..." : (
                <span>
                  <i className="fa-solid fa-upload"></i> Upload file
                </span>
              )
            }
          </button>
        </div>
        <label htmlFor="">Selected class images (in png, jpg, and jpeg), video, audio, etc</label>
      </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button onClick={addClasses}  type="button"  className="btn btn-primary text-capitalize " data-bs-dismiss="modal"
          aria-label="Close">
         {
          uploadClass ? "Loading ..." : "Add class"
         }
        </button>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
    <ClassesShow />
    </>
  )
}

export default Classes