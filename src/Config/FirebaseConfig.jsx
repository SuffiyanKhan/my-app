import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, deleteUser     } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc, collection, query, where, getDocs,  addDoc , onSnapshot, getDoc, } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCwEqIHka7xNBkmMbQ8y7SYJn5yvSoCFME",
  authDomain: "practice-59895.firebaseapp.com",
  databaseURL: "https://practice-59895-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "practice-59895",
  storageBucket: "practice-59895.appspot.com",
  messagingSenderId: "199591437506",
  appId: "1:199591437506:web:4ddcfb5950a80527e8475b",
  measurementId: "G-BVJH3VNX01"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);


export {storage ,ref, uploadBytesResumable, getDownloadURL, createUserWithEmailAndPassword, auth, doc, setDoc, db, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, deleteDoc, collection, query, where, getDocs,  addDoc, onSnapshot, getDoc, deleteUser  }
// export {storage ,ref, uploadBytesResumable, getDownloadURL, createUserWithEmailAndPassword, auth, doc, setDoc, db, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, deleteDoc, deleteUser, collection, query, where, getDocs,  addDoc, onSnapshot, getDoc,   }